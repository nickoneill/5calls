import * as React from 'react';

import { Issue } from '../../common/models';
import { SidebarHeader, Sidebar, Footer, Header } from './index';

import {
  remoteStateContext,
  callStateContext,
  userStateContext
} from '../../contexts';

interface Props {
  readonly children?: {};
  readonly extraHeader?: React.ReactNode;
  readonly extraBody?: React.ReactNode;
  readonly showSidebar?: boolean;
}

function currentIssue(
  issues: Issue[],
  currentIssueID: string
): Issue | undefined {
  let issue: Issue | undefined;
  if (issues) {
    issue = issues.find(eachIssue => {
      return (
        eachIssue.id.toString() === currentIssueID ||
        eachIssue.slug === currentIssueID
      );
    });
  }

  return issue;
}

const Layout: React.StatelessComponent<Props> = (props: Props) => (
  <remoteStateContext.Consumer>
    {remoteState => (
      <>
        <callStateContext.Consumer>
          {callState => (
            <>
              <userStateContext.Consumer>
                {userState => (
                  <Header
                    currentUser={userState}
                    currentIssue={currentIssue(
                      remoteState.issues,
                      callState.currentIssueId
                    )}
                  />
                )}
              </userStateContext.Consumer>
              {props.showSidebar && (
                <div className="content">
                  {props.extraHeader}
                  <div className="g">
                    {props.extraBody}
                    <div className="i-bar">
                      <SidebarHeader />
                      <Sidebar
                        issues={remoteState.issues}
                        currentIssue={currentIssue(
                          remoteState.issues,
                          callState.currentIssueId
                        )}
                        completedIssueIds={callState.completedIssueIds}
                        contacts={remoteState.contacts}
                      />
                    </div>
                    {props.children}
                  </div>
                </div>
              )}
              {!props.showSidebar && <>{props.children}</>}
              {/* <div className="layout ">
                <aside id="nav" role="contentinfo" className="layout__side">
                  <div className="issues">
                    <SidebarHeader />
                    <Sidebar
                      issues={remoteState.issues}
                      currentIssue={currentIssue(
                        remoteState.issues,
                        callState.currentIssueId
                      )}
                      completedIssueIds={callState.completedIssueIds}
                      contacts={remoteState.contacts}
                    />
                  </div>
                </aside>
                <main
                  id="content"
                  role="main"
                  aria-live="polite"
                  className="layout__main"
                >
                  {props.children}
                </main>
              </div> */}
              <Footer />
            </>
          )}
        </callStateContext.Consumer>
      </>
    )}
  </remoteStateContext.Consumer>
);

Layout.defaultProps = { showSidebar: true };

export default Layout;
