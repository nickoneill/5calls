import { Outcome, Contact, ContactList } from './';
import { UserContactEvent } from '../../redux/userStats/reducer';

export class Issue {
  public id: number;
  public name: string;
  public contactType: string;
  public contactAreas: string[];
  public reason: string;
  public script: string;
  public categories: Category[];
  public active: boolean;
  public createdAt: string;
  public slug: string;
  public outcomeModels: Outcome[];
  public link: string;
  public linkTitle: string;
  public stats: IssueStats;

  public slugOrID(): string {
    if (this.slug !== '') {
      return this.slug;
    }

    return this.id.toString();
  }

  public numberOfContacts(contactList: ContactList): number {
    return this.filteredContacts(contactList).length;
  }

  public numberOfCompletedContacts(
    contactList: ContactList,
    userEvents: UserContactEvent[]
  ): number {
    return this.filteredContacts(contactList).filter(contact =>
      this.isContactComplete(contact, userEvents)
    ).length;
  }

  public currentContact(
    contactList: ContactList,
    contactIndex: number
  ): Contact | undefined {
    const contacts = this.filteredContacts(contactList);

    if (contactIndex <= contacts.length) {
      return contacts[contactIndex];
    }

    return undefined;
  }

  // why do we need filtered contacts if we already have an array of contacts?
  // a) ensuring consistent ordering
  // b) sometimes we get back multiple house reps in split areas
  public filteredContacts(contactList: ContactList): Contact[] {
    const contacts: Contact[] = [];

    for (const contactArea of this.contactAreas) {
      if (contactArea === 'US Senate') {
        contacts.push(...contactList.senateReps());
      } else if (contactArea === 'US House') {
        contacts.push(...contactList.houseRep());
      } else if (contactArea === 'Governor') {
        contacts.push(...contactList.governor());
      } else if (contactArea === 'StateUpper') {
        contacts.push(...contactList.stateUpper());
      } else if (contactArea === 'StateLower') {
        contacts.push(...contactList.stateLower());
      } else if (contactArea === 'SecretaryOfState') {
        contacts.push(...contactList.secState());
      } else if (contactArea === 'AttorneyGeneral') {
        contacts.push(...contactList.attyGeneral());
      }
    }

    return contacts;
  }

  public isContactComplete(
    contact: Contact,
    userEvents: UserContactEvent[]
  ): boolean {
    return (
      userEvents.findIndex(
        event =>
          event.issueid === this.id.toString() && event.contactid === contact.id
      ) > -1
    );
  }

  public listItemLabel(): string {
    switch (this.contactType) {
      case 'REPS':
        return 'Call reps' + this.countLabel();
      case 'ACTION':
        return 'Take action' + this.countLabel();
      default:
        return '???';
    }
  }

  public countLabel(): string {
    if (this.stats.calls < 10) {
      return '';
    }

    switch (this.contactType) {
      case 'REPS':
        return ' ⋆ ' + this.stats.calls + ' calls made';
      case 'ACTION':
        return ' ⋆ ' + this.stats.calls + ' actions taken';
      default:
        return '???';
    }
  }
}

export interface IssueStats {
  completion: number;
  calls: number;
}

export interface Category {
  name: string;
}

export const mockIssue = Object.assign(new Issue(), {
  id: 123,
  name: 'Issue Name',
  contactType: 'REPS',
  contactAreas: [],
  reason: 'reason',
  script: 'issue *mock script*',
  active: true,
  createdAt: '',
  slug: 'issue-name',
  outcomeModels: [],
  link: '',
  linkTitle: '',
  stats: { completion: 0, calls: 10 }
});
