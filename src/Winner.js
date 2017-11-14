import React, { Component, PropTypes } from 'react';
import {partyData} from './constants';

class Winner extends Component {
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

Winner.propTypes = {winner: PropTypes.string};

export default Winner
