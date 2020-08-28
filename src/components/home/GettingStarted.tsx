import * as React from 'react';

import { Layout } from '../layout';
import { Link } from 'react-router-dom';

const GettingStarted: React.StatelessComponent = () => {
  return (
    <Layout showSidebar={false}>
      <div className="content">
        <div className="g step">
          <i className="fa fa-fw a-ctr fa-vote-yea" />

          <div className="step-content">
            <h2 className="h3">Choose an issue you care&nbsp;about.</h2>

            <p>
              Make calls in support of civil rights, gun reform, immigration,
              net neutrality and more.
            </p>

            <p>
              If you don’t see your issue on the list, please{' '}
              <Link to="mailto:hello@5calls.org">reach out</Link>.
            </p>
          </div>
        </div>

        <div className="g step">
          <i className="fa fa-fw a-ctr fa-search-location" />

          <div className="step-content">
            <h2 className="h3">Enter your location.</h2>

            <p>
              Next, we'll figure out who you need to call in your area. We can
              find your ZIP code for you, or you can enter it manually.
            </p>

            <p>
              If your ZIP code is in more than one Congressional district, we
              may also ask for your cross streets to more accurately locate you.
            </p>

            <p className="info-box">
              Your location stays private. We don't store it in the cloud, and
              we never sell data to third parties.
            </p>
          </div>
        </div>

        <div className="g step">
          <i className="fa fa-fw a-ctr fa-phone-alt" />

          <div className="step-content">
            <h2 className="h3">Make the calls.</h2>

            <p>
              We’ll tell you everyone you should call for your chosen issue,
              from Representatives and Senators to Governors and Attorneys
              General.
            </p>

            <p>
              Once you mark the result of your call, we’ll show you the next
              person’s number.
            </p>
          </div>
        </div>

        <div className="g step">
          <i className="fa fa-fw a-ctr fa-laptop" />

          <div className="step-content">
            <h2 className="h3">Sign up for more.</h2>

            <p>
              Follow us on{' '}
              <a href="https://www.facebook.com/make5calls">Facebook</a>
              {` `}
              and <a href="https://twitter.com/make5calls">Twitter</a> to learn
              about new issues. Or subscribe to our{' '}
              <Link to="/">weekly newsletter</Link>.
            </p>
          </div>
        </div>
      </div>

      <section className="alt">
        <div className="content">
          <h2>Tips for Calling</h2>

          <div className="g calling-tips">
            <div className="card borderless a-ctr">
              <i className="far fa-fw fa-clock" />
              <p>
                <strong>Keep it short.</strong>
              </p>

              <p>Calls should take less than a&nbsp;minute.</p>
            </div>

            <div className="card borderless a-ctr">
              <i className="far fa-fw fa-grin-alt" />
              <p>
                <strong>Stick to the script, or improvise.</strong>
              </p>

              <p>
                We've worked on our scripts to keep your calls easy, but feel
                free to personalize it with your own words if you’d&nbsp;like.
              </p>
            </div>

            <div className="card borderless a-ctr">
              <i className="far fa-fw fa-comment-dots" />
              <p>
                <strong>Speak clearly.</strong>
              </p>

              <p>
                You’ll be talking to a congressional staffer. They'll need to
                understand your opinion before they can tally&nbsp;it.
              </p>
            </div>

            <div className="card borderless a-ctr">
              <i className="far fa-fw fa-handshake" />
              <p>
                <strong>Be respectful.</strong>
              </p>

              <p>
                No matter which party they work for, the staffers that pick up
                the phone aren’t looking to challenge&nbsp;you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="content">
        <h2>Who to Call First</h2>

        <div className="g">
          <div className="measure">
            <ul>
              <li>
                <strong>Start with their D.C. office.</strong> When you open an
                issue page, we start with your congressperson’s Washington, D.C.
                office. You should call that one before trying a local office.
              </li>
              <li>
                <strong>If no one picks up, leave a voicemail.</strong>{' '}
                Congressional offices check voicemail every day. They will tally
                your message just like a call. Make sure to mention your street
                address in the message. That way, your congressperson will know
                they represent you.
              </li>
              <li>
                <strong>
                  If you can’t get through, call their local offices.
                </strong>{' '}
                Press “Call a local office” to see their phone numbers. (On our
                iOS app, tap “Line busy?” instead.) Your senators will have a
                few local offices. Since they represent your entire state, it
                doesn’t matter which one you call, even if it’s far away from
                you.
              </li>
              <li>
                <strong>If all else fails,</strong> try emailing, tweeting,
                sending a postcard, or using the contact form on their website.
                But these are absolute last resorts, since phone calls have the
                most impact by far.
              </li>
            </ul>
            <div className="info-box">
              <p>
                If you can’t get through, we know it’s frustrating. Ever since
                Donald Trump took office, congressional offices are seeing
                record call volume.
              </p>
              <p>
                But if you can’t reach your congressperson, that usually means a
                lot of people cared enough to call. That's amazing! Don’t sweat
                it and try again later.
              </p>
            </div>
          </div>
        </div>

        <h2>F.A.Q.</h2>

        <div className="g g-faq">
          <div className="card">
            <p>
              <strong>
                Why should I call the House on issues that only affect the
                Senate (and vice versa)?
              </strong>
            </p>
            <p>
              Depending on the issue, we want to show a clear display of general
              support or dissent. Even if a congressperson isn’t voting on an
              issue, they’re all talking to their colleagues and to the media.
            </p>
            <p>
              On top of that, your congressperson works for you. You’re free to
              (politely) express whatever you want.
            </p>
          </div>

          <div className="card">
            <p>
              <strong>
                Can I save time by mentioning multiple issues in the same call?
              </strong>
            </p>
            <p>
              Unfortunately, no: it’s most effective to make a separate call for
              each issue. That’s because congressional insiders tell us what
              really matters is the number of calls they get, not the number of
              people calling in.
            </p>
            <p>
              We know it seems weird to hang up and call the same person right
              back. That’s why we’ve added district office numbers for each
              congressperson, so you can talk to different staffers if you’d
              like.
            </p>
          </div>

          <div className="card">
            <p>
              <strong>Why can’t I send a letter or email instead?</strong>
            </p>
            <p>
              Calling is by far the most effective way to reach your
              congressperson. To learn more, check out{' '}
              <Link to="/why-calling-works/">
                our guide to why calling works
              </Link>
              .
            </p>
          </div>
        </div>

        <h2>Ready to start making&nbsp;calls?</h2>

        <p className="a-ctr">
          <a href="/" className="button">
            Find an issue
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default GettingStarted;
