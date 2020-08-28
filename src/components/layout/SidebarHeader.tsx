import * as React from 'react';

import { Location } from '../location';
import { locationStateContext } from '../../contexts';

interface Props {}

const SidebarHeader: React.StatelessComponent<Props> = (props: Props) => {
  return (
    <div className="i-bar-location">
      <locationStateContext.Consumer>
        {locationState => <Location locationState={locationState} />}
      </locationStateContext.Consumer>
    </div>
  );
};

export default SidebarHeader;
