import { CallCountAction, IssuesAction, RemoteDataActionType } from './index';
import { Issue, ContactList } from '../../common/models';
import { ContactsAction, ToggleDonateAction } from './action';

export const issuesActionCreator = (issues: Issue[]): IssuesAction => {
  return {
    type: RemoteDataActionType.GET_ISSUES,
    payload: issues
  };
};

export const callCountActionCreator = (callTotal: number): CallCountAction => {
  return {
    type: RemoteDataActionType.GET_CALL_TOTAL,
    payload: callTotal
  };
};

export const toggleDonateActionCreator = (): ToggleDonateAction => {
  return {
    type: RemoteDataActionType.TOGGLE_DONATE_EMBED
  };
};

export const contactsActionCreator = (
  contacts: ContactList
): ContactsAction => {
  return {
    payload: contacts,
    type: RemoteDataActionType.GET_CONTACTS
  };
};
