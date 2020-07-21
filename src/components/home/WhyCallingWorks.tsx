import * as React from 'react';

import { Layout } from '../layout';
import { Link } from 'react-router-dom';

interface NewsClip {
  source: { name: string; logo: string };
  url: string;
  quote: string;
}

export const WhyCallingWorks: React.StatelessComponent = () => {
  const newsClips: NewsClip[] = [
    {
      source: {
        name: 'Vox',
        logo: 'vox.png'
      },
      url:
        'https://www.vox.com/policy-and-politics/2016/11/15/13641920/trump-resist-congress',
      quote:
        'Tweets, Facebook messages, emails, and even letters can be easily discarded and ignored… but a blast of phone calls can seriously disrupt a congressional office.\n'
    },
    {
      source: {
        name: 'The New York Times',
        logo: 'nytimes.png'
      },
      url:
        'https://www.nytimes.com/2016/11/22/us/politics/heres-why-you-should-call-not-email-your-legislators.html',
      quote:
        'A phone call from a constituent can, indeed, hold more weight than an email, and far outweighs a Facebook post or a tweet.\n'
    },
    {
      source: {
        name: 'The Washington Post',
        logo: 'post.png'
      },
      url:
        'https://www.washingtonpost.com/powerpost/a-day-of-chaos-at-the-capitol-as-house-republicans-back-down-on-ethics-changes/2017/01/03/50e392ac-d1e6-11e6-9cb0-54ab630851e8_story.html',
      quote:
        '“I can tell you the [number of] calls we’ve gotten in my district office and here in Washington surprised me.“\n'
    }
  ];

  return (
    <Layout showSidebar={false}>
      <div className="content">
        <h1>
          Calling your representative is the best way to make your
          voice&nbsp;heard.
        </h1>
      </div>
      <div className="content">
        <div className="g">
          <div className="measure">
            <p>
              Once your congressperson forms a public stance on an issue, it’s
              hard for them to walk it back. The earlier they hear your opinion,
              the more likely it is you’ll make an impact.
            </p>
            <p>
              Calling is by far the most effective way to ensure that your
              representative hears you in time.
            </p>
          </div>
        </div>
        <h2>Other kinds of messages take&nbsp;longer.</h2>
        <div className="g g-3up a-ctr">
          <div className="card">
            <i className="fa fa-envelope-open-text" />
            <span>
              <strong>Emails</strong> have to be manually
              read&nbsp;and&nbsp;sorted.
            </span>
          </div>
          <div className="card">
            <i className="fa fa-fax" />
            <span>
              <strong>Faxes</strong> have to be digitized and emailed.
            </span>
          </div>
          <div className="card">
            <i className="fa fa-mail-bulk" />
            <span>
              <strong>Letters and postcards</strong> can be quarantined for
              safety inspections.
            </span>
          </div>
        </div>
        <div className="g">
          <p className="measure small a-ctr other-comms-footnote">
            By contrast, congressional staffers tally phone calls right away.
          </p>
        </div>
      </div>

      <section className="alt">
        <div className="content">
          <h2>No matter their politics, calling&nbsp;works.</h2>
          <div className="g g-2up">
            <div className="card a-ctr borderless">
              <p>
                <i className="far fa-thumbs-up" />
                <strong>If you support their stance&hellip;</strong>
              </p>
              <p>
                You need to let your congressperson know! When they talk to
                colleagues, they use call tallies and personal stories from
                constituents to better support their positions.
              </p>
            </div>

            <div className="card a-ctr borderless">
              <p>
                <i className="far fa-thumbs-down" />
                <strong>
                  If you oppose or don’t know their&nbsp;stance&hellip;
                </strong>
              </p>
              <p>
                Calling is the easiest way to sway them! Your congressperson
                gets regular call tally reports, letting them know how strongly
                their constituents feel about an issue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="content">
        <h2>Don’t just take it from us.</h2>

        <div className="g g-3up">
          {newsClips.map(clip => (
            <p className="news-clip">
              <Link to={clip.url}>
                <span className="news-clip-head">
                  <img
                    src={`/img/${clip.source.logo}`}
                    alt={clip.source.name}
                  />
                  <i className="fa fa-external-link-alt" />
                </span>
                <span className="news-clip-body">{clip.quote}</span>
              </Link>
            </p>
          ))}
        </div>

        <h2>Ready to get started?</h2>

        <p className="a-ctr">
          <a href="/" className="button">
            Choose an issue today
          </a>
        </p>
      </div>
    </Layout>
  );
};

export default WhyCallingWorks;
