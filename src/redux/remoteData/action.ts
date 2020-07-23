import { Action } from 'redux';
import { Issue, ContactList } from '../../common/models';

export enum RemoteDataActionType {
  GET_ISSUES = 'GET_ISSUES',
  GET_CONTACTS = 'GET_CONTACTS',
  GET_CALL_TOTAL = 'GET_CALL_TOTAL'
}

export interface RemoteDataAction extends Action {
  type: RemoteDataActionType;
  payload?: {};
}

export interface IssuesAction extends RemoteDataAction {
  type: RemoteDataActionType.GET_ISSUES;
  payload: Issue[];
}

export interface ContactsAction extends RemoteDataAction {
  type: RemoteDataActionType.GET_CONTACTS;
  payload: ContactList;
}

export interface CallCountAction extends RemoteDataAction {
  type: RemoteDataActionType.GET_CALL_TOTAL;
  payload: number;
}
