import * as React from 'react';
import { RemoteDataState } from '../redux/remoteData';
import { defaultRemoteDataState } from '../redux/remoteData/reducer';

export const remoteStateContext = React.createContext<RemoteDataState>(
  defaultRemoteDataState
);
