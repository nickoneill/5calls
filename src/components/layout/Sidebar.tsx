import * as React from 'react';
import { Issue, ContactList } from '../../common/models';
import { IssuesList } from '../issues';
import { getIssuesIfNeeded, getContactsIfNeeded } from '../../redux/remoteData';

interface Props {
  readonly issues: Issue[];
  readonly currentIssue?: Issue;
  readonly completedIssueIds: string[];
  contacts: ContactList;
}

const Sidebar: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <IssuesList
      issues={props.issues}
      currentIssue={props.currentIssue}
      completedIssueIds={props.completedIssueIds}
      getIssuesIfNeeded={getIssuesIfNeeded}
      getContactsIfNeeded={getContactsIfNeeded}
      contacts={props.contacts}
    />
  );
};

export default Sidebar;
