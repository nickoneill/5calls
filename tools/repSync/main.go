package main

import (
	"log"
	"os"
)

func main() {
	elasticSearchURL := os.Getenv("FIVECALLS_ELASICSEARCH_URL")
	if elasticSearchURL == "" {
		log.Fatal("could not get elasticsearch env")
	}

	// • fetch all reps, organized by area
	// 	 • start with house, senate, govs (elasticsearch stuff)
	// • create markdown files
}
