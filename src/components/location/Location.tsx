import * as React from 'react';
import { LocationState } from '../../redux/location/reducer';
import { clearAddress, setLocation } from '../../redux/location';
import { store } from '../../redux/store';
import { getBrowserGeolocation } from '../../services/geolocationServices';
import { getContactsIfNeeded } from '../../redux/remoteData/asyncActionCreator';

interface Props {
  locationState: LocationState;
}

// this will be needed
interface State {
  uiState: LocationUIState;
  triedAutoLocation: boolean;
}

export enum LocationUIState {
  NO_LOCATION = 'NO_LOCATION',
  FETCHING_LOCATION = 'FETCHING_LOCATION',
  ENTERING_LOCATION = 'ENTERING_LOCATION',
  LOCATION_FOUND = 'LOCATION_FOUND',
  LOCATION_ERROR = 'LOCATION_ERROR'
}

export class Location extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // set initial state

    this.state = {
      uiState: LocationUIState.NO_LOCATION,
      triedAutoLocation: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.locationState.address === '' &&
      this.props.locationState.address !== ''
    ) {
      this.setState({ uiState: LocationUIState.LOCATION_FOUND });

      // if the location has updated, force a contact refresh
      if (
        prevProps.locationState.address !== this.props.locationState.address
      ) {
        getContactsIfNeeded(true);
      }
    }
  }

  componentDidMount() {
    switch (this.state.uiState) {
      case LocationUIState.NO_LOCATION:
        // if there's a saved location, set it
        if (
          this.props.locationState.address &&
          this.props.locationState.address !== ''
        ) {
          this.setState({ uiState: LocationUIState.LOCATION_FOUND });
        }
        break;
      default:
        break;
    }
  }

  fetchLocation() {
    this.setState({ uiState: LocationUIState.FETCHING_LOCATION });

    getBrowserGeolocation()
      .then(loc => {
        store.dispatch(setLocation(loc.latitude + ',' + loc.longitude));
      })
      .catch(err => {
        // ok, go to manual entry
        this.setState({ uiState: LocationUIState.ENTERING_LOCATION });
      });
  }

  manuallySetLocation(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    this.setState({ uiState: LocationUIState.ENTERING_LOCATION });
  }

  enterLocation(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    store.dispatch(clearAddress());

    // see if browser supports location
    let browserSupportsLocation = 'geolocation' in navigator;
    if (browserSupportsLocation && this.state.triedAutoLocation === false) {
      this.setState({ triedAutoLocation: true });
      this.fetchLocation();
    } else {
      // go to manual entrys
      this.setState({ uiState: LocationUIState.ENTERING_LOCATION });
    }
  }

  submitLocation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // tslint:disable-next-line:no-string-literal
    const newLocation = e.currentTarget.elements['address'].value;

    if (newLocation === '') {
      // if the user hits "Go" with no location, clear what they had and refresh to try the default again
      store.dispatch(clearAddress());
      window.location.reload();
    } else {
      store.dispatch(setLocation(newLocation));
      this.setState({ uiState: LocationUIState.LOCATION_FOUND });
    }
  }

  // --- each location state is below

  noLocation() {
    return (
      <div className="is-visible">
        <span>Get started by setting your location</span>
        <button className="button-link" onClick={e => this.enterLocation(e)}>
          {' '}
          Set your location
        </button>
      </div>
    );
  }

  findingLocation() {
    return (
      <div className="is-visible">
        <span className="i-bar-loading">
          <i className="fa fa-map-marker" />{' '}
          <b>Getting your location automatically&hellip;</b>
        </span>
        <button
          className="button-link"
          onClick={e => this.manuallySetLocation(e)}
        >
          {' '}
          Or enter an address manually
        </button>
      </div>
    );
  }

  enteringLocation() {
    return (
      <div className="is-visible">
        <span>Enter an address or ZIP code</span>
        <form onSubmit={e => this.submitLocation(e)}>
          <input
            type="text"
            name="address"
            placeholder="1600 Pennsylvania Ave NW, Washington, DC 20500"
          />
          <button className="button button-small button-red">Go</button>
        </form>
      </div>
    );
  }

  locationFound() {
    return (
      <div className="is-visible">
        <span>Showing representatives for</span>
        <strong>{this.props.locationState.cachedCity}</strong>
        <button className="button-link" onClick={e => this.enterLocation(e)}>
          Change location
        </button>
      </div>
    );
  }

  render() {
    switch (this.state.uiState) {
      case LocationUIState.NO_LOCATION:
        return this.noLocation();
      case LocationUIState.LOCATION_ERROR:
        return <h1>error lol</h1>;
      case LocationUIState.LOCATION_FOUND:
        return this.locationFound();
      case LocationUIState.FETCHING_LOCATION:
        return this.findingLocation();
      case LocationUIState.ENTERING_LOCATION:
        return this.enteringLocation();
      default:
        return <>no state for {this.state.uiState}</>;
    }
  }
}
