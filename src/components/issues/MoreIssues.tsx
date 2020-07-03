import * as React from 'react';

import { Issue, Category, CategoryMap } from '../../common/models';
import { IssuesListItem } from './index';
import { RemoteDataState } from '../../redux/remoteData';
import { userStatsContext } from '../../contexts';

interface Props {
  readonly remoteState: RemoteDataState;
  readonly completedIssueIds: string[];
}

interface State {
  issueCategoryMap: CategoryMap[];
  totalCount: number;
}

export class MoreIssues extends React.Component<Props, State> {
  static defaultProps = {
    completedIssueIds: []
  };

  constructor(props: Props) {
    super(props);
    this.state = this.setStateFromProps(props);
  }

  setStateFromProps(props: Props): State {
    const totalCount =
      (props.remoteState.inactiveIssues
        ? props.remoteState.inactiveIssues.length
        : 0) + (props.remoteState.issues ? props.remoteState.issues.length : 0);
    let categoryMap: CategoryMap[] = [];

    // this makes more sense as an actual Map<string, Issues[]> but I couldn't get it
    // to render in the view no matter what I tried, so it's this /shrug
    if (this.props.remoteState.inactiveIssues) {
      this.props.remoteState.inactiveIssues.forEach(issue => {
        let category: string = 'uncategorized';

        if (issue.categories[0]) {
          category = issue.categories[0].name;

          let availableMap;
          categoryMap.forEach(map => {
            if (map.category.name === category) {
              availableMap = map;
            }
          });

          if (availableMap) {
            availableMap.issues.push(issue);
          } else {
            let newCategory: Category = { name: category };
            let newCategoryMap: CategoryMap = {
              category: newCategory,
              issues: [issue]
            };
            categoryMap.push(newCategoryMap);
          }
        }
      });
    }

    categoryMap.sort((a, b) => {
      let nameA = a.category.name.toLowerCase();
      let nameB = b.category.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return {
      issueCategoryMap: categoryMap,
      totalCount: totalCount
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.remoteState.issues.length > 0 &&
      prevProps.remoteState.issues.length === 0
    ) {
      let newState = this.setStateFromProps(this.props);
      this.setState(newState);
    }
  }

  isIssueComplete(issue: Issue): boolean {
    return (
      this.props.completedIssueIds.find(
        (issueId: string) => issue.slugOrID() === issueId
      ) !== undefined
    );
  }

  render() {
    const contacts = this.props.remoteState.contacts;
    return (
      <section className="call">
        <div className="call_complete">
          <h1 className="call__title">
            {this.state.totalCount + ' Active Issues'}
          </h1>
          <userStatsContext.Consumer>
            {userStatsState => (
              <>
                {this.state.issueCategoryMap ? (
                  this.state.issueCategoryMap.map((cat, key) => (
                    <div key={key}>
                      <h2>{cat.category.name}</h2>
                      <ul className="issues-list" role="navigation">
                        {cat.issues.map(issue => (
                          <IssuesListItem
                            key={issue.id}
                            issue={issue}
                            isIssueActive={false}
                            isIssueComplete={
                              issue.numberOfCompletedContacts(
                                contacts,
                                userStatsState.all
                              ) > 0
                            }
                            contactsCount={issue.numberOfContacts(contacts)}
                            completeCount={issue.numberOfCompletedContacts(
                              contacts,
                              userStatsState.all
                            )}
                          />
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <span />
                )}
              </>
            )}
          </userStatsContext.Consumer>
        </div>
      </section>
    );
  }
}
