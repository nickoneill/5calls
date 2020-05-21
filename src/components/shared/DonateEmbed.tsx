import * as React from 'react';
import { store } from '../../redux/store';
import { toggleDonateActionCreator } from '../../redux/remoteData/actionCreator';

interface Props {
  show?: boolean;
}

class DonateEmbed extends React.Component<Props> {
  public render() {
    return (
      <div
        className="donate-contain"
        hidden={!this.props.show}
        onClick={e => {
          e.preventDefault();
        }}
      >
        <button
          onClick={() => {
            store.dispatch(toggleDonateActionCreator());
          }}
        >
          close
        </button>
        <div
          className="donate-form"
          data-ab-form={true}
          data-ab-amounts="500,1000,2000,5000"
          data-ab-token="5iuTAwr4Tnr8EvmUeAN5AsoQ"
          data-ab-height="600px"
        />
      </div>
    );
  }
}

export default DonateEmbed;
