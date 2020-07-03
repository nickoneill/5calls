import * as React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { SidebarHeader, Sidebar, Footer, Header } from './layout';
import { callStateContext, remoteStateContext } from '../contexts';

const NotFoundPage: React.StatelessComponent = () => {
  return (
    <div>
      <Helmet>
        <title>5 Calls: Make your voice heard</title>
      </Helmet>
      <Header />
      <div className="layout">
        <aside id="nav" role="contentinfo" className="layout__side">
          <div className="issues">
            <SidebarHeader />
            <remoteStateContext.Consumer>
              {remoteState => (
                <callStateContext.Consumer>
                  {callState => (
                    <Sidebar
                      issues={remoteState.issues}
                      currentIssue={undefined}
                      completedIssueIds={callState.completedIssueIds}
                      contacts={remoteState.contacts}
                    />
                  )}
                </callStateContext.Consumer>
              )}
            </remoteStateContext.Consumer>
          </div>
        </aside>
        <main
          id="content"
          role="main"
          aria-live="polite"
          className="layout__main"
        >
          <section className="loading">
            <h2>There's nothing here 😢</h2>
            <p>
              Looks like you visited a page that doesn't exist. Pick one of the
              issues on the sidebar or{' '}
              <Link to="/">go back to the homepage</Link>.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
