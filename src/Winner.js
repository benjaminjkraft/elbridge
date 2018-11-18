// @flow
import React, { Component } from 'react';
import {partyData} from './constants';
import type {Party} from './types';

type Props = {|winner: Party|};

class Winner extends Component<Props> {
  render() {
    const {winner} = this.props;
    if (winner === undefined) {
      return null;
    } else {
      return <span>
        <span style={{color: winner ? partyData[winner].color : "black"}}>
          ⚫
        </span>
        {winner === null ? "Tie" : partyData[winner].name}
      </span>;
    }
  }
}

export default Winner
