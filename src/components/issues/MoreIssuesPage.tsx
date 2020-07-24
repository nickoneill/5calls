import * as React from 'react';

import { Layout } from '../layout';
import { MoreIssues } from './index';
import { remoteStateContext } from '../../contexts/RemoteStateContext';
import { callStateContext } from '../../contexts';
import { getIssuesIfNeeded } from '../../redux/remoteData';

interface Props {}

class MoreIssuesPage extends React.Component<Props> {
  componentDidMount() {
    // need this now that we don't have the sidebar
    getIssuesIfNeeded();
  }

  render() {
    return (
      <Layout showSidebar={false}>
        <main role="main" id="content" className="layout__main">
          <callStateContext.Consumer>
            {callState => (
              <remoteStateContext.Consumer>
                {state => (
                  <MoreIssues
                    remoteState={state}
                    completedIssueIds={callState.completedIssueIds}
                  />
                )}
              </remoteStateContext.Consumer>
            )}
          </callStateContext.Consumer>
        </main>
      </Layout>
    );
  }
}

export default MoreIssuesPage;
