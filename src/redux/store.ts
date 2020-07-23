import {
  applyMiddleware,
  createStore,
  Store,
  compose,
  Middleware
} from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import rootReducer, { ApplicationState } from './root';
import thunk from 'redux-thunk';
import { defaultRemoteDataState } from './remoteData/reducer';
import { CallState } from './callState';
import { LocationState } from './location';
import { defaultUserStatsState } from './userStats/reducer';
import { UserState } from './userState';

const middlewares: Middleware[] = [thunk];

export let persistor = {} as Persistor;
export let store = {} as Store<ApplicationState>;

const defaultApplicationState = {
  remoteDataState: defaultRemoteDataState,
  callState: {} as CallState,
  locationState: {} as LocationState,
  userStatsState: defaultUserStatsState,
  userState: {} as UserState
};

export default initialState => {
  store = createStore<ApplicationState>(
    rootReducer,
    defaultApplicationState,
    // we need to migrate away from compose to not use `any` here
    // tslint:disable-next-line
    compose<any>(
      applyMiddleware(...middlewares),
      // This added for Redux Dev Tools - install Chrome or Firefox extension to use
      typeof window === 'object' &&
        // tslint:disable-next-line: no-string-literal
        typeof window['devToolsExtension'] !== 'undefined'
        ? // tslint:disable-next-line: no-string-literal
          window['devToolsExtension']()
        : f => f
    )
  );

  persistor = persistStore(store);

  return store;
};
