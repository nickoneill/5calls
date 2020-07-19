import * as React from 'react';

// import { Location } from '../location';
// import { locationStateContext } from '../../contexts';

interface Props {}

const SidebarHeader: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div className="i-bar-location">
      <div className="is-visible">
        <span>Showing representatives for</span>
        <strong>Oakland, CA</strong>
        <button className="button-link">Change location</button>
      </div>

      <div>
        <span className="i-bar-loading">
          <i className="fa fa-map-marker" />{' '}
          <b>Getting your location automatically&hellip;</b>
        </span>
        <button className="button-link"> Or enter an address manually</button>
      </div>

      <div>
        <span>Enter an address or ZIP code</span>
        <form>
          <input type="text" placeholder="20500" />
          <button className="button button-small button-red">Go</button>
        </form>
      </div>
    </div>
    // <header className="issues__header" role="banner">
    //   <div className="issues__location">
    //     <locationStateContext.Consumer>
    //       {locationState => <Location locationState={locationState} />}
    //     </locationStateContext.Consumer>
    //   </div>
    //   <h2>What’s important to you?</h2>
    // </header>
  );
};

export default SidebarHeader;
