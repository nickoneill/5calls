import * as React from 'react';
import { Link } from 'react-router-dom';
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

export class IssuesListItem extends React.Component<Props, State> {
  render() {
    const { completeCount, contactsCount, isIssueActive, issue } = this.props;
    const isCompleted =
      completeCount > 0 && completeCount === contactsCount ? 'is-complete' : '';
    const isActive = isIssueActive ? 'is-active' : '';
    const issueLink = `/issue/${issue.slugOrID()}`;

    return (
      <li>
        <Link
          aria-controls="content"
          className={`issues-list__item ${isCompleted} ${isActive}`}
          to={issueLink}
          onClick={() => selectIssueActionCreator(issue.id.toString())}
        >
          <span
            aria-live="polite"
            className={`issues-list__item__status ${isCompleted} ${isActive}`}
          >
            {isCompleted ? (
              <span className="visually-hidden" />
            ) : (
              getProgressCircle(completeCount, contactsCount)
            )}
          </span>
          <span
            className={`issues-list__item__title ${isCompleted} ${isActive}`}
          >
            {issue.name}
          </span>
          <span
            className={`issues-list__item__summary ${isCompleted} ${isActive}`}
          >
            {/* TODO: Finish this impl */}
            <span>X calls to make</span>
          </span>
        </Link>
      </li>
    );
  }
}

function getProgressCircle(completeCount: number, contactsCount: number) {
  const R = 18;
  const C = 2 * 3.14 * R;
  const dashLength =
    contactsCount === 0 ? 0 : (C * completeCount) / contactsCount;

  // leaving as much of the styling as possible in the .SCSS file but stroke dashes need to be inlined for % math
  const circleStyleProgress = {
    strokeDasharray: `${dashLength} ${C - dashLength}`,
    strokeDashoffset: `${C / 4}` // offetting by 1/4 circle makes the progress start at the top
  };

  return (
    <svg
      viewBox={`0 0 ${R * 2} ${R * 2}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <circle cx={`${R}`} cy={`${R}`} r={`${R}`} />
      <circle
        cx={`${R}`}
        cy={`${R}`}
        r={`${R}`}
        style={circleStyleProgress}
        className="progress"
      />
    </svg>
  );
}

export default IssuesListItem;
