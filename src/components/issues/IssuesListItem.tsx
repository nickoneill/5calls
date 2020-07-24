import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { Issue } from '../../common/models';
import { selectIssueActionCreator } from '../../redux/callState';

interface Props {
  readonly issue: Issue;
  readonly isIssueComplete: boolean;
  readonly isIssueActive: boolean;
  readonly contactsCount: number;
  readonly completeCount: number;
}

interface State {}

export class IssuesListItem extends React.Component<
  Props & RouteComponentProps,
  State
> {
  progressSection(completeCount: number, contactsCount: number) {
    const isCompleted = completeCount > 0 && completeCount === contactsCount;

    if (isCompleted) {
      return (
        <div className="i-bar-check-completed">
          <i className="fa fa-check" />
          <span className="sr-only">Completed</span>
        </div>
      );
    } else if (completeCount === 0) {
      return (
        <div className="i-bar-check-initial">
          <i className="fa fa-phone-alt" />
          <span className="sr-only">Needs your calls</span>
        </div>
      );
    } else {
      return getProgressCircle(completeCount, contactsCount);
    }
  }

  render() {
    const { completeCount, contactsCount, issue } = this.props;
    const isCompleted = completeCount > 0 && completeCount === contactsCount;

    return (
      <button
        className={`i-bar-item is-unsorted ${isCompleted ? 'completed' : ''}`}
        onClick={() => this.selectIssue(issue)}
      >
        <div className="i-bar-item-check">
          {this.progressSection(completeCount, contactsCount)}
        </div>
        <strong>{issue.name}</strong>
      </button>
    );
  }
  // <li>
  //   <Link
  //     aria-controls="content"
  //     className={`issues-list__item ${isCompleted} ${isActive}`}
  //     to={issueLink}
  //     onClick={() => selectIssueActionCreator(issue.id.toString())}
  //   >
  //     <span
  //       aria-live="polite"
  //       className={`issues-list__item__status ${isCompleted} ${isActive}`}
  //     >
  //       {isCompleted ? (
  //         <span className="visually-hidden" />
  //       ) : (
  //         getProgressCircle(completeCount, contactsCount)
  //       )}
  //     </span>
  //     <span
  //       className={`issues-list__item__title ${isCompleted} ${isActive}`}
  //     >
  //       {issue.name}
  //     </span>
  //     <span
  //       className={`issues-list__item__summary ${isCompleted} ${isActive}`}
  //     >
  //       {/* TODO: Finish this impl */}
  //       <span>X calls to make</span>
  //     </span>
  //   </Link>
  // </li>
  selectIssue = (issue: Issue) => {
    const issueLink = `/issue/${issue.slugOrID()}`;
    this.props.history.push(issueLink);

    selectIssueActionCreator(issue.id.toString());
  };
}

function getProgressCircle(completeCount: number, contactsCount: number) {
  const R = 18;
  const C = 2 * 3.14 * R;
  const dashLength =
    contactsCount === 0 ? 0 : (C * completeCount) / contactsCount;
  // leaving as much of the styling as possible in the .SCSS file but stroke dashes need to be inlined for % math
  // const circleStyleProgress = {
  //   strokeDasharray: `${dashLength} ${C - dashLength}`,
  //   strokeDashoffset: `${C / 4}` // offetting by 1/4 circle makes the progress start at the top
  // };
  return (
    <>
      <div className="i-bar-check-percent" />
      <svg width="100%" height="100%" viewBox="0 0 24 24">
        <circle
          r="12"
          cx="12"
          cy="12"
          stroke-width="24"
          stroke-dasharray={`${dashLength} ${C - dashLength}`}
        />
        <span className="sr-only">50% done</span>
      </svg>
    </>

    // <svg
    //   viewBox={`0 0 ${R * 2} ${R * 2}`}
    //   xmlns="http://www.w3.org/2000/svg"
    //   style={{ overflow: 'visible' }}
    // >
    //   <circle cx={`${R}`} cy={`${R}`} r={`${R}`} />
    //   <circle
    //     cx={`${R}`}
    //     cy={`${R}`}
    //     r={`${R}`}
    //     style={circleStyleProgress}
    //     className="progress"
    //   />
    // </svg>
  );
}

export default withRouter(IssuesListItem);
