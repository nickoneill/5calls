import * as React from 'react';

import { Layout } from '../layout';
import { Link } from 'react-router-dom';

const Troubleshooting: React.StatelessComponent = () => {
  return (
    <Layout showSidebar={false}>
      <div className="content">
        <h1>Troubleshooting</h1>
      </div>

      <div className="content troubleshooting">
        <div className="g">
          <div className="measure a-ctr">
            <p>
              We're here to help. Here are a few answers to common&nbsp;issues.
            </p>
          </div>
        </div>

        <h2>Where can I find my congressperson’s local office&nbsp;number?</h2>

        <div className="g g-3up a-ctr">
          <div>
            <img src="/img/troubleshooting/local-web.png" />

            <p>
              <strong>Web</strong>
            </p>

            <p>
              When you’re on an issue page, click "Or call a local office" under
              your congressperson’s big red DC phone number.
            </p>
          </div>

          <div>
            <img src="/img/troubleshooting/local-ios.png" />
            <p>
              <strong>iOS</strong>
            </p>
            Tap “Local Offices” under the congressperson’s photo.
          </div>

          <div>
            <img src="/img/troubleshooting/local-android.png" />
            <p>
              <strong>Android</strong>
            </p>
            Tap “Call a local office”.
          </div>
        </div>

        <h2>
          I only see one congressperson’s number. How do I call the others?
        </h2>

        <div className="g g-3up a-ctr">
          <div>
            <img src="/img/troubleshooting/result-web.png" />
            <p>
              <strong>Web</strong>
            </p>
            After you call your first congressperson, mark the result of the
            call. The page will reload, and you’ll see the next number.
          </div>

          <div>
            <img src="/img/troubleshooting/result-ios.png" />
            <p>
              <strong>iOS</strong>
            </p>
            After you call your first congressperson, mark the result of the
            call and you’ll see the next number.
          </div>

          <div>
            <img src="/img/troubleshooting/result-android.png" />
            <p>
              <strong>Android</strong>
            </p>
            After you call your first congressperson, mark the result of the
            call and you’ll see the next number.
          </div>
        </div>

        <h2>How do I change my location?</h2>

        <div className="g g-3up a-ctr">
          <div>
            <img src="/img/troubleshooting/location-web.png" />
            <p>
              <strong>Web</strong>
            </p>
            Click the current city or ZIP code under the 5 Calls logo.
          </div>

          <div>
            <img src="/img/troubleshooting/location-ios.png" />
            <p>
              <strong>iOS</strong>
            </p>
            Tap the current city or ZIP code under the 5 Calls logo.
          </div>

          <div>
            <img src="/img/troubleshooting/location-android.png" />
            <p>
              <strong>Android</strong>
            </p>
            On the launch screen, tap the location icon in the top right corner.
          </div>
        </div>

        <div className="g">
          <div className="measure">
            <p className="info-box">
              We use your location to match you with the members of Congress you
              need to call, so make sure to keep that info up to date.
            </p>
          </div>
        </div>

        <h2>My question isn’t listed here.</h2>

        <div className="g">
          <div className="measure">
            <p>
              For more help, check out our{' '}
              <Link to="https://intercom.help/5calls/en/collections/1497141-using-the-5-calls-website-and-apps">
                knowledge base
              </Link>{' '}
              and [guide to getting started](/getting-started/).
            </p>

            <p>
              If you still can’t find what you’re looking for, email us at
              <Link to="mailto:hello@5calls.org">hello@5calls.org</Link>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Troubleshooting;
