import React, { Component, PropTypes } from 'react';
import {districtColors, partyData} from './Constants';
import {contiguous} from './util';

class DistrictRow extends Component {
  districtName(id) {
    if (id === 0) {
      return "Unassigned";
    } else {
      return `District ${id}`;
    }
  }

  render () {
    const {id, size, idealSize, parties, winner, precincts} = this.props;

    let incorrectReason;
    if (idealSize) {
      if (!contiguous(precincts)) {
        incorrectReason = "District is not contiguous";
      } else if (size > idealSize) {
        incorrectReason = "District too large";
      } else if (size < idealSize) {
        incorrectReason = "District too small";
      }
    } else {
      if (size !== 0) {
        incorrectReason = "Not all precincts assigned";
      }
    }

    return <tr style={{backgroundColor: districtColors[id]}}>
      {/* TODO: maybe a fancier tooltip */}
      <td title={incorrectReason}>{incorrectReason ? "❌" : "✔"}</td>
      <th>{this.districtName(id)}</th>
      <td>{size}{idealSize && `/${idealSize}`}</td>
      {/* TODO: colors; generalize */}
      <td>
        {winner !== undefined &&
          <span style={{color: winner ? partyData[winner].color : "black"}}>
            ⚫
          </span>}
        {winner === undefined ? "" : winner === null ? "Tie" :
          partyData[winner].name}
      </td>
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
