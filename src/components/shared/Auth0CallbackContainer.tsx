import * as React from 'react';
import { store } from '../../redux/store';
import {
  setAuthTokenActionCreator,
  setProfileActionCreator
} from '../../redux/userState';
import { uploadStatsIfNeeded } from '../../redux/remoteData/asyncActionCreator';
import { Auth0Config } from '../../common/constants';
import { AuthResponse } from './authModels';
import { Auth0Callback } from '../login/Auth0Callback';

interface Props {}

interface State {}

export class Auth0CallbackContainer extends React.Component<Props, State> {
  handleAuthentication = (
    authResponse: AuthResponse
  ): Promise<AuthResponse> => {
    // console.log('AuthoCallbackContainer.handleAuthentication() token', authResponse.authToken);
    // console.log('AuthoCallbackContainer.handleAuthentication() user profile', authResponse.userProfile);
    store.dispatch(setAuthTokenActionCreator(authResponse.authToken));
    store.dispatch(setProfileActionCreator(authResponse.userProfile));

    // check for unuploaded stats
    // tslint:disable-next-line:no-any
    store.dispatch<any>(uploadStatsIfNeeded());

    return Promise.resolve(authResponse);
  };

  render() {
    return (
      <Auth0Callback
        auth0Config={Auth0Config}
        handleAuthentication={this.handleAuthentication}
      />
    );
  }
}
