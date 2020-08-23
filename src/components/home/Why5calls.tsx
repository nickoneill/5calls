import * as React from 'react';

import * as Constants from '../../common/constants';
import { Link } from 'react-router-dom';

interface Props {
  totalCount: number;
}

const Why5calls: React.StatelessComponent<Props> = (props: Props) => (
  <div className="hypothesis">
    <header className="hypothesis__header">
      <h1 className="hypothesis__title">Make your voice heard</h1>
      <h2 className="hypothesis__subtitle">
        <strong>5 Calls</strong> is the easiest and most effective way for
        citizens to make an impact in national and local politics
      </h2>
    </header>
    <div className="hypothesis__voternetwork">
      <a href="https://voternetwork.us/app">
        <img src="/img/voter-network-logo.png" alt="Voter Network" />
      </a>
      <h2>Want to help your friends vote?</h2>
      <p>
        <strong>NEW for the 2020 Election: </strong>Download{' '}
        <a href="https://voternetwork.us/app">our Voter Network app today</a>,
        automatically find friends and family that need help registering to vote
        or applying to vote by mail.
      </p>
    </div>
    <div className="hypothesis__text">
      <a href={Constants.contact.apps}>
        <img src="/img/5calls-apps.png" className="hypothesis__text__mobile" />
      </a>
      <p>
        Calling is the most effective way to influence your representative. Read
        more about <Link to="/about">why calling works.</Link>
      </p>
      <div className="subscribe">
        <form
          action="//5calls.us16.list-manage.com/subscribe/post?u=82a164d5fe7f51f4a4efb1f83&amp;id=624ef52208"
          method="post"
          target="popupwindow"
        >
          <label htmlFor="email">
            <strong>Get email alerts once a week</strong>
          </label>
          <span className="emailform input-group">
            <input
              type="text"
              placeholder="youremail@example.com"
              name="email"
              id="email"
            />
            <input
              type="submit"
              value="Subscribe"
              className=" btn btn-secondary btn-subtle"
            />
          </span>
        </form>
      </div>
      <div style={{ clear: 'both' }} />
    </div>
  </div>
);

export default Why5calls;
