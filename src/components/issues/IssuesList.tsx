import * as React from 'react';

import { Issue, ContactList } from '../../common/models';
import { IssuesListItem } from './index';

import { userStatsContext } from '../../contexts';
import { UserStatsState } from '../../redux/userStats';

interface Props {
  issues: Issue[];
  currentIssue?: Issue;
  completedIssueIds: string[];
  contacts: ContactList;
  getIssuesIfNeeded: () => void;
  getContactsIfNeeded: (force: boolean) => void;
}

export class IssuesList extends React.Component<Props> {
  componentDidMount() {
    this.props.getIssuesIfNeeded();
    this.props.getContactsIfNeeded(false);
  }

  listItems = (userStatsState: UserStatsState) => {
    const { contacts, issues } = this.props;
    let currentIssueId = this.props.currentIssue
      ? this.props.currentIssue.id
      : 0;

    if (issues && issues.map) {
      return issues.map(issue => (
        <IssuesListItem
          key={issue.id}
          issue={issue}
          isIssueComplete={
            issue.numberOfCompletedContacts(contacts, userStatsState.all) > 0
          }
          contactsCount={issue.numberOfContacts(contacts)}
          completeCount={issue.numberOfCompletedContacts(
            contacts,
            userStatsState.all
          )}
          isIssueActive={currentIssueId === issue.id}
        />
      ));
    } else {
      return null;
    }
  };

  render() {
    return (
      <userStatsContext.Consumer>
        {userStatsState => this.listItems(userStatsState)}
      </userStatsContext.Consumer>
    );
  }
}
