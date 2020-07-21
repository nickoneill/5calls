import * as React from 'react';
import { Layout } from '../layout';
import { Link } from 'react-router-dom';

interface Team {
  title: string;
  volunteers: Volunteer[];
  allVolsURL?: string;
}

interface Volunteer {
  name: string;
  avatar?: string;
  service?: string;
  username: string;
  link: string;
}

export const AboutPage: React.StatelessComponent = () => {
  const contributors: Team[] = [
    {
      title: 'Web Design and Engineering',
      volunteers: [
        {
          name: 'Mike Monteiro',
          username: 'monteiro',
          link: 'https://twitter.com/monteiro'
        },
        {
          name: 'Stewart Scott-Curran',
          username: 'stewartsc',
          link: 'https://twitter.com/stewartsc'
        },
        {
          name: 'Craig Doremus',
          username: 'cdoremus',
          link: 'https://twitter.com/cdoremus'
        },
        {
          name: 'Rob Brackett',
          username: 'mr0grog',
          link: 'https://twitter.com/mr0grog'
        }
      ],
      allVolsURL: 'https://github.com/5calls/5calls/graphs/contributors'
    },
    {
      title: 'iOS Team',
      volunteers: [
        {
          name: 'Ben Scheirman',
          username: 'subdigital',
          link: 'https://twitter.com/subdigital'
        },
        {
          name: 'Patrick McCarron',
          username: 'mccarron',
          link: 'https://twitter.com/mccarron'
        }
      ],
      allVolsURL: 'https://github.com/5calls/ios/graphs/contributors'
    },
    {
      title: 'Android Team',
      volunteers: [
        {
          name: 'Katie Dektar',
          service: 'github',
          username: 'dektar',
          link: 'https://github.com/dektar'
        },
        {
          name: 'Greg Lee',
          service: 'github',
          username: 'gregliest',
          link: 'https://github.com/gregliest'
        }
      ],
      allVolsURL: 'https://github.com/5calls/android/graphs/contributors'
    },
    {
      title: 'Editorial and Social',
      volunteers: [
        {
          name: 'Charm Bitanga',
          username: 'charmbtrippin',
          link: 'https://twitter.com/charmbtrippin'
        },
        {
          name: 'Sara',
          service: 'instagram',
          username: 'sara.n.g',
          link: 'https://www.instagram.com/sara.n.g/'
        },
        {
          name: 'Rachel Perkins',
          username: 'djpiebob',
          link: 'https://twitter.com/djpiebob'
        },
        {
          name: 'Rati Gupta',
          username: 'theRati',
          link: 'https://twitter.com/theRati'
        },
        {
          name: 'Eleanor Wertman',
          service: 'medium',
          username: 'eleanor.wertman',
          link: 'https://medium.com/eleanor.wertman'
        }
      ]
    }
  ];

  return (
    <Layout showSidebar={false}>
      <div className="content">
        <h1>We’re a team of volunteers making advocacy accessible.</h1>

        <div className="g">
          <div className="measure">
            <p>
              5 Calls makes it easy for you to reach your members of Congress
              and make your voice heard.
            </p>

            <p>
              We research issues, write scripts that clearly articulate a
              progressive position, figure out the most influential
              decision-makers, and collect phone numbers for their offices.
            </p>

            <p>All you have to do is call.</p>
          </div>
        </div>
      </div>

      <section className="alt">
        <div className="content">
          <div className="g founders">
            <div className="founders-photo">
              <img
                src="/img/avatar.svg"
                alt="Photo of Nick O'Neill and Rebecca Kaufman."
              />
            </div>

            <div className="founders-body">
              <p>
                <strong>Nick O'Neill</strong> and{' '}
                <strong>Rebecca Kaufman</strong> started 5 Calls after working
                on some work and doing some other things.
              </p>

              <p className="founders-social">
                <a href="https://twitter.com/nickoneill">
                  <i className="fab fa-twitter" /> @nickoneill
                </a>{' '}
                <a href="https://twitter.com/syntheticmethod">
                  <i className="fab fa-twitter" /> @syntheticmethod
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="content">
        {contributors.map(team => (
          <div className="about-team">
            <h2>{team.title}</h2>

            <div className="volunteer-wrapper">
              {team.volunteers.map(vol => (
                <div className="volunteer">
                  <p>
                    <img src={vol.avatar ? vol.avatar : '/img/avatar.svg'} />
                  </p>
                  <p>
                    <strong>{vol.name}</strong>
                  </p>
                  <p>
                    <Link to={vol.link}>
                      <i
                        className={`fab fa-${
                          vol.service ? vol.service : 'twitter'
                        }`}
                      />
                      {` `}@{vol.username}
                    </Link>
                  </p>
                </div>
              ))}

              <p className="small full-list-link">
                {team.allVolsURL ? (
                  <a href={team.allVolsURL}>See all our contributors</a>
                ) : (
                  <p>
                    Our thanks to all our contributors, including those not
                    mentioned here!
                  </p>
                )}
              </p>
            </div>
          </div>
        ))}
        <h2>Want to get involved?</h2>

        <div className="g g-3up a-ctr">
          <div className="card">
            <i className="fab fa-twitter" />
            <strong>DM us on Twitter</strong>
            <p>
              Message <a href="https://twitter.com/make5calls">@make5calls</a>
            </p>
          </div>

          <div className="card">
            <i className="fa fa-envelope-open-text" />
            <strong>Tell us how you'd like to help</strong>
            <p>
              Email{' '}
              <a href="mailto:hello@make5calls.org?subject=Volunteering">
                hello@make5calls.org
              </a>
            </p>
          </div>

          <div className="card">
            <i className="fab fa-github" />
            <strong>Contribute on GitHub</strong>
            <p>
              Browse our starter issues for{' '}
              <a href="https://github.com/5calls/5calls/issues?q=is%3Aissue+is%3Aopen+label%3A%22starter+issue%22">
                Web
              </a>
              ,{' '}
              <a href="https://github.com/5calls/ios/issues?q=is%3Aissue+is%3Aopen+label%3A%22starter+issue%22">
                iOS
              </a>
              , or&nbsp;
              <a href="https://github.com/5calls/android/issues?q=is%3Aissue+is%3Aopen+label%3A%22starter+issue%22">
                Android
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
