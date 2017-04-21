import React, { Component, PropTypes } from 'react';
import {districtColors, partyData} from './Constants';

class DistrictRow extends Component {
  districtName(id) {
    if (id === 0) {
      return "Unassigned";
    } else {
      return `District ${id}`;
    }
  }

  render () {
    const {id, size, idealSize, parties, winner} = this.props;

    return <tr style={{backgroundColor: districtColors[id]}}>
      <th>{this.districtName(id)}</th>
      <td>{size}{idealSize && `/${idealSize}`}</td>
      {/* TODO: colors; generalize */}
      <td>{winner === undefined ? "" :
           winner === null ? "tie" : partyData[winner].name}</td>
      <td>{parties.R} {partyData.R.name}/{parties.D} {partyData.D.name}</td>
    </tr>
  }
}

DistrictRow.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  idealSize: PropTypes.number,
  parties: PropTypes.objectOf(PropTypes.number),
  winner: PropTypes.string,
}

export default DistrictRow;
