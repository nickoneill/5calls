import * as React from 'react';
import i18n from '../../services/i18n';
import { Link } from 'react-router-dom';

import { Issue } from '../../common/models';
import { IssuesListItem } from './index';

interface Props {
  issues: Issue[];
  currentIssue?: Issue;
  completedIssueIds: string[];
  getIssuesIfNeeded: () => void;
}

export class IssuesList extends React.Component<Props> {
  componentDidMount() {
    this.props.getIssuesIfNeeded();
  }

  listFooter = () => {
    return (
      <div>
        <Link to={`/more`} className={`issues__footer-link`}>
          <span>{i18n.t('issues.viewAllActiveIssues')}</span>
        </Link>
      </div>
    );
  };

  listItems = () => {
    let currentIssueId = this.props.currentIssue
      ? this.props.currentIssue.id
      : 0;

    if (this.props.issues && this.props.issues.map) {
      return this.props.issues.map(issue => (
        <IssuesListItem
          key={issue.id}
          issue={issue}
          isIssueComplete={
            this.props.completedIssueIds &&
            this.props.completedIssueIds.find(
              (issueId: string) => issue.slug === issueId
            ) !== undefined
          }
          isIssueActive={currentIssueId === issue.id}
        />
      ));
    } else {
      return (
        <div style={{ textAlign: 'center' }}>{i18n.t('noCalls.title')}</div>
      );
    }
  };

  render() {
    return (
      <div>
        <ul className="issues-list" role="navigation">
          {this.listItems()}
        </ul>
        {this.listFooter()}
      </div>
    );
  }
}
