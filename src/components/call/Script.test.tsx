import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { shallow } from 'enzyme';
import i18n from '../../services/i18n';
import { Script } from './';
import { getContactNameWithTitle } from './Script';
import { LocationState } from '../../redux/location';
import { linkRefRenderer } from '../shared/markdown-utils';
import { Issue, mockIssue } from '../../common/models/issue';
import { Contact, LocationFetchType } from '../../common/models';
import { mockContact } from '../../common/models/contact';

test('Script component should be rendered if passed a valid object', () => {
  const locationState: LocationState = {
    address: '1234',
    cachedCity: 'Anytown',
    splitDistrict: false,
    invalidAddress: false,
    locationFetchType: LocationFetchType.BROWSER_GEOLOCATION
  };
  const component = shallow(
    <Script
      issue={mockIssue}
      currentContact={mockContact}
      locationState={locationState}
    />
  );
  expect(component).toMatchSnapshot();
});

describe('when the script text is shown', () => {
  test('it uses ReactMarkdown for display formatting', () => {
    const locationState: LocationState = {
      address: '1234',
      cachedCity: 'Anytown',
      splitDistrict: false,
      invalidAddress: false,
      locationFetchType: LocationFetchType.BROWSER_GEOLOCATION
    };

    const wrapper = shallow(
      <Script
        issue={mockIssue}
        currentContact={mockContact}
        locationState={locationState}
      />
    );
    expect(
      wrapper.contains(
        <ReactMarkdown
          source="issue *mock script*"
          linkTarget="_blank"
          renderers={{ linkReference: linkRefRenderer }}
        />
      )
    ).toBe(true);
  });
});

describe('getContactNameWithTitle', () => {
  const contacts: Contact[] = [
    Object.assign(new Contact(), {
      id: '293',
      area: 'US House',
      name: 'Googly Moogly',
      phone: '',
      state: '',
      party: '',
      reason: ''
    }),
    Object.assign(new Contact(), {
      id: '666',
      area: 'US Senate',
      name: 'Damian Longhoof',
      phone: '',
      state: '',
      party: '',
      reason: ''
    }),
    Object.assign(new Contact(), {
      id: '123',
      area: 'AttorneyGeneral',
      name: 'Betty White',
      phone: '',
      state: '',
      party: '',
      reason: ''
    }),
    Object.assign(new Contact(), {
      id: '789',
      area: 'StateLower',
      name: 'Luna Lovegood',
      phone: '',
      state: '',
      party: '',
      reason: ''
    }),
    Object.assign(new Contact(), {
      id: '739',
      area: 'Underground',
      name: 'Lisbeth Salander',
      phone: '',
      state: '',
      party: '',
      reason: ''
    })
  ];
  it('returns the name of the contact with their title', () => {
    const repTitle = getContactNameWithTitle(contacts[0]);
    expect(repTitle).toBe('Rep. Googly Moogly');
    const senateTitle = getContactNameWithTitle(contacts[1]);
    expect(senateTitle).toBe('Senator Damian Longhoof');
    const agTitle = getContactNameWithTitle(contacts[2]);
    expect(agTitle).toBe('Attorney General Betty White');
    const legTitle = getContactNameWithTitle(contacts[3]);
    expect(legTitle).toBe('Legislator Luna Lovegood');
  });
  it('returns just the name of the contact when the title is unknown', () => {
    const unknownTitle = getContactNameWithTitle(contacts[4]);
    expect(unknownTitle).toBe('Lisbeth Salander');
  });
});
