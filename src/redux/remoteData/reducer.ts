import { Reducer } from 'redux';
import { Issue, ContactList, Contact } from '../../common/models';
import { RemoteDataAction, RemoteDataActionType } from './index';

export const defaultRemoteDataState: RemoteDataState = {
  issues: [],
  inactiveIssues: [],
  contacts: new ContactList(),
  callTotal: 0,
  errorMessage: '',
  showDonateEmbed: false
};

export interface RemoteDataState {
  issues: Issue[];
  inactiveIssues: Issue[];
  contacts: ContactList;
  callTotal: number;
  errorMessage: string;
  showDonateEmbed: boolean;
}

export const remoteDataReducer: Reducer<RemoteDataState> = (
  state: RemoteDataState = {} as RemoteDataState,
  action: RemoteDataAction
): RemoteDataState => {
  switch (action.type) {
    case RemoteDataActionType.GET_ISSUES:
      // filter all issues into active / inactive
      let activeIssues: Issue[] = [];
      let inactiveIssues: Issue[] = [];
      if (action && action.payload) {
        let issues = action.payload as Issue[];
        activeIssues = issues
          .filter(item => {
            return item.active === true;
          })
          .map(item => Object.assign(new Issue(), item));
        inactiveIssues = issues
          .filter(item => {
            return item.active === false;
          })
          .map(item => Object.assign(new Issue(), item));
      }

      const issuesState = Object.assign({}, state, {
        issues: activeIssues,
        inactiveIssues: inactiveIssues
      });
      return issuesState;
    case RemoteDataActionType.GET_CONTACTS:
      const contactList = action.payload as ContactList;
      contactList.representatives = contactList.representatives.map(contact =>
        Object.assign(new Contact(), contact)
      );
      return Object.assign({}, state, {
        contacts: contactList
      });
    case RemoteDataActionType.GET_CALL_TOTAL:
      return Object.assign({}, state, { callTotal: action.payload });
    case RemoteDataActionType.TOGGLE_DONATE_EMBED:
      return { ...state, showDonateEmbed: !state.showDonateEmbed };
    default:
      return state;
  }
};
