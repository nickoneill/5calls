import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout } from '../layout';
import { remoteStateContext } from '../../contexts/RemoteStateContext';
import { formatNumber } from '../shared/utils';

interface Props extends RouteComponentProps<{ id: string }> {}

/*
  This is a StatelessComponent meaning that it is just a function. The props are passed in as
  a property.  More complicated components will be instantiated as a class and will often
  have "local" state.  Props for them will be an instance property.

  Notice that we are just passing all of the props that we pull off the Redux Store through
  this component to child components
*/
export const HomePage: React.SFC<Props> = (props: Props) => (
  <remoteStateContext.Consumer>
    {state => (
      <Layout
        extraHeader={<h1>Make your voice&nbsp;heard.</h1>}
        extraBody={<HomeExtraBody />}
      >
        <div className="card-home-wrapper">
          <div className="card card-home">
            <i className="fa fa-fw fa-phone-alt" />
            <div className="card-home-body">
              <h2 className="h3">
                Calling your congressperson is the most effective way to sway
                them.
              </h2>
              <p>
                <a href="/why-calling-works/">
                  Learn more about why calling works.
                </a>
              </p>
            </div>
          </div>

          <div className="card card-home">
            <i className="fa fa-fw fa-hand-holding-heart" />
            <div className="card-home-body">
              <h2 className="h3">
                We've made {formatNumber(state.callTotal)} calls so far.
                Join&nbsp;us.
              </h2>
              <p>
                Pick an issue from the list, or{' '}
                <a href="/getting-started/">
                  read our guide to getting started.
                </a>
              </p>
            </div>
          </div>

          <div className="card card-home">
            <i className="fa fa-fw fa-heart" />
            <div>
              <h2 className="h3">We're a team of volunteers.</h2>
              <p>
                Want to help out?{' '}
                <a href="mailto:hello@5calls.org?subject=Volunteering">
                  Email us.
                </a>
              </p>
            </div>
          </div>

          <div className="card card-home">
            <i className="fa fa-fw fa-envelope-open-text" />
            <div>
              <h2 className="h3">Get updates on the latest issues.</h2>
              <p>Subscribe to our newsletter. Once a week, no spam.</p>
              <form
                action="//5calls.us16.list-manage.com/subscribe/post?u=82a164d5fe7f51f4a4efb1f83&amp;id=624ef52208"
                method="post"
                target="popupwindow"
                className="subscribe"
              >
                <label htmlFor="email" className="sr-only">
                  Enter your email address
                </label>
                <div className="subscribe-body">
                  <input
                    type="text"
                    placeholder="leslie.knope@pawnee.gov"
                    name="MERGE0"
                    id="email"
                  />
                  <input type="submit" className="button" value="Subscribe" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    )}
  </remoteStateContext.Consumer>
);

const HomeExtraBody: React.StatelessComponent = () => (
  <div className="measure a-ctr">
    <p>
      5 Calls is the easiest and most effective way for U.S. constituents to
      make a political impact.
    </p>
  </div>
);

export default HomePage;
