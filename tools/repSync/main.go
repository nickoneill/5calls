package main

import (
	"bytes"
	"context"
	"encoding/json"
	"log"
	"os"

	elasticsearch "github.com/elastic/go-elasticsearch/v6"
)

func main() {
	elasticSearchURL := os.Getenv("FIVECALLS_ELASICSEARCH_URL")
	if elasticSearchURL == "" {
		log.Fatal("could not get elasticsearch env")
	}

	// configure client
	cfg := elasticsearch.Config{
		Addresses: []string{
			elasticSearchURL,
		},
	}
	es, _ := elasticsearch.NewClient(cfg)

	// encode our query for everything
	query := map[string]interface{}{
		"size": "1000",
		"_source": map[string]interface{}{
			"excludes": []string{"shape", "id", "ID"},
		},
	}
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}

	// • fetch all reps, organized by area
	res, err := es.Search(
		es.Search.WithContext(context.Background()),
		es.Search.WithIndex("house,senate,governor"),
		es.Search.WithBody(&buf),
	)
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	var queryRes elasticsearchQueryResponse
	if err := json.NewDecoder(res.Body).Decode(&queryRes); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	contacts := []elasticSearchContact{}
	// • start with house, senate, govs (elasticsearch stuff)
	for _, hit := range queryRes.Hits.Hits {
		if hit.Index == "house" {
			contacts = append(contacts, hit.Source.getContact())
		} else if hit.Index == "senate" {
			contacts = append(contacts, hit.Source.getContact())
		} else if hit.Index == "governor" {
			contacts = append(contacts, hit.Source.getContact())
		} else {
			log.Printf("can't find a source type")
		}
	}

	// • create markdown files
	log.Printf("found %d contacts frmo %d", len(contacts), len(queryRes.Hits.Hits))
}

type elasticsearchQueryResponse struct {
	Hits elasticsearchQueryHitGroup
}

type elasticsearchQueryHitGroup struct {
	Total int
	Hits  []elasticsearchQueryHit
}

type elasticsearchQueryHit struct {
	Index  string                    `json:"_index"`
	Source elasticsearchQueryContact `json:"_source"`
}

type elasticsearchQueryContact struct {
	State    string `json:"state_name"`
	District *int
	Phone    string
	Fax      string
	Name     string
	Party    string
	PhotoURL string `json:"photo_url"`
}

func (c elasticsearchQueryContact) getContact() elasticSearchContact {
	contact := elasticSearchContact{
		// ID:           fmt.Sprintf("%s-%s", state, spaceMap(c.Name)),
		Name:     c.Name,
		Phone:    c.Phone,
		PhotoURL: c.PhotoURL,
		// Party:        c.Party,
		// State:        state,
		// Reason:       "This is your representative in the House.",
		// Area:         "US House",
		// FieldOffices: []models.FieldOffice{},
	}

	return contact
}

type elasticSearchContact struct {
	Name     string
	Phone    string
	PhotoURL string
}
