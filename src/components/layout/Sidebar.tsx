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
    <section className="i-bar-list-section">
      <header className="i-bar-header i-bar-header-unsorted">
        <h3>
          <i className="fa fa-newspaper" /> In the News
        </h3>
      </header>
      <IssuesList
        issues={props.issues}
        currentIssue={props.currentIssue}
        completedIssueIds={props.completedIssueIds}
        getIssuesIfNeeded={getIssuesIfNeeded}
        getContactsIfNeeded={getContactsIfNeeded}
        contacts={props.contacts}
      />
    </section>
  );
};

export default Sidebar;
