import { Dispatch } from 'redux';
import * as querystring from 'querystring';

import { CountData, Issue, ContactList } from './../../common/models';
import {
  getAllIssues,
  getCountData,
  postBackfillOutcomes,
  getUserCallDetails,
  getContacts,
  noLocationError
} from '../../services/apiServices';
import { setCachedCity } from '../location/index';
import { issuesActionCreator, callCountActionCreator } from './index';
import { clearContactIndexes } from '../callState/';
import { ApplicationState } from '../root';
import { Auth0Config } from '../../common/constants';
import { UserContactEvent } from '../userStats';
import { setUploadedActionCreator } from '../userStats/actionCreator';
import {
  clearProfileActionCreator,
  setAuthTokenActionCreator,
  setProfileActionCreator,
  UserProfile
} from '../userState';
import { setInvalidAddress, setLocation } from '../location/actionCreator';
import { store } from '../store';
import { contactsActionCreator } from './actionCreator';
import { removeURLParameter } from '../../components/shared/utils';
import bugsnagClient from '../../services/bugsnag';
import { LoginService } from '../../components/login/LoginService';

export const getIssuesIfNeeded = () => {
  const state = store.getState();

  // Only make the api call if it hasn't already been made
  if (
    !state.remoteDataState.issues ||
    state.remoteDataState.issues.length === 0
  ) {
    getAllIssues()
      .then((response: Issue[]) => {
        store.dispatch(issuesActionCreator(response));
      })
      .catch(error => {
        // tslint:disable-next-line:no-console
        console.error(`error getting issues: ${error.message}`, error);
      });
  }
};

export const getContactsIfNeeded = (force: boolean) => {
  const state = store.getState();

  if (state.remoteDataState.contacts.representatives.length === 0 || force) {
    getContacts()
      .then((contactList: ContactList) => {
        store.dispatch(contactsActionCreator(contactList));
        store.dispatch(setCachedCity(contactList.location));
        store.dispatch(setInvalidAddress(false));
      })
      .catch(error => {
        if (error === noLocationError) {
          // normal case for when we don't yet have a location
        } else {
          // tslint:disable-next-line:no-console
          console.error('couldnt fetch contacts: ', error);
          bugsnagClient.notify(
            Error('reps error with location ' + state.locationState.address)
          );
          store.dispatch(setInvalidAddress(true));
        }
      });
  }
};

export const fetchCallCount = () => {
  return getCountData()
    .then((response: CountData) => {
      store.dispatch(callCountActionCreator(response.count));
    })
    .catch(error =>
      // tslint:disable-next-line:no-console
      console.error(`fetchCallCount error: ${error.message}`, error)
    );
};

export const fetchDonations = () => {
  return (
    dispatch: Dispatch<ApplicationState>,
    getState: () => ApplicationState
  ) => {
    return;
    // return getDonations()
    //   .then((response: DonationGoal) => {
    //     const donations: Donations = response.goal;
    //     dispatch(donationsActionCreator(donations));
    //   })
    //   // tslint:disable-next-line:no-console
    //   .catch(e => console.error(`fetchDonations error: ${e.message}`, e));
  };
};

export const uploadStatsIfNeeded = () => {
  return (
    dispatch: Dispatch<ApplicationState>,
    getState: () => ApplicationState
  ) => {
    const state: ApplicationState = getState();

    if (state.userState.idToken) {
      let unuploadedStats: UserContactEvent[] = [];

      for (let i = 0; i < state.userStatsState.all.length; i++) {
        if (!state.userStatsState.all[i].uploaded) {
          unuploadedStats.push(state.userStatsState.all[i]);
          dispatch(setUploadedActionCreator(state.userStatsState.all[i].time));
        }
      }

      if (unuploadedStats.length > 0) {
        postBackfillOutcomes(unuploadedStats, state.userState.idToken);
      }
    }
  };
};

export interface UserCallDetails {
  stats: UserStats;
  weeklyStreak: number;
  firstCallTime: number;
  calls: DailyCallReport[];
}

export interface DailyCallReport {
  date: string;
  issues: IssueSummary[];
}

export interface IssueSummary {
  count: number;
  issue_name: string;
}

export interface UserStats {
  voicemail: number;
  unavailable: number;
  contact: number;
}

export const getProfileInfo = async (): Promise<UserProfile> => {
  const state = store.getState();

  if (state.userState.profile && state.userState.idToken) {
    const callDetails = await getUserCallDetails(state.userState.idToken);
    // attach details to token profile
    let filledProfile = state.userState.profile;
    filledProfile.callDetails = callDetails;

    return filledProfile;
  } else {
    // not logged in
  }

  return Promise.reject('no profile sorry');
};

export const startup = () => {
  const state = store.getState();

  // clear contact indexes loaded from local storage
  store.dispatch(clearContactIndexes());

  // check expired login and handle or logout
  const auth = new LoginService(Auth0Config);
  if (state.userState.profile && state.userState.idToken) {
    auth
      .checkAndRenewSession(state.userState.profile, state.userState.idToken)
      .then(authResponse => {
        // Set the updated profile ourselves - auth is a component that doesn't know about redux
        store.dispatch(setAuthTokenActionCreator(authResponse.authToken));
        store.dispatch(setProfileActionCreator(authResponse.userProfile));
      })
      .catch(error => {
        // clear the session
        store.dispatch(clearProfileActionCreator());
      });
  }

  fetchCallCount();

  // set location automatically if it comes in via query string
  let replacedLocation = false;
  let q = querystring.parse(location.search.substr(1));
  const newLocation = q['setLocation']; // tslint:disable-line:no-string-literal
  if (newLocation !== undefined && newLocation.length > 0) {
    store.dispatch(setLocation(newLocation));
    replacedLocation = true;
  }
  // remove query string param so we don't set it again
  if (replacedLocation) {
    window.history.replaceState(
      {},
      document.title,
      removeURLParameter(location.href, 'setLocation')
    );
  }
};
