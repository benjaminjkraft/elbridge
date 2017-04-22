import React, { Component, PropTypes } from 'react';
import {districtColors, partyData} from './Constants';
import {contiguous} from './util';
import Winner from './Winner';

class DistrictRow extends Component {
  districtName(id) {
    if (id === 0) {
      return "Unassigned";
    } else {
      return `District ${id}`;
    }
  }

  render () {
    const {id, idealSize, parties, winner, precincts} = this.props;

    let incorrectReason;
    if (idealSize) {
      if (!contiguous(precincts)) {
        incorrectReason = "District is not contiguous";
      } else if (precincts.length > idealSize) {
        incorrectReason = "District too large";
      } else if (precincts.length < idealSize) {
        incorrectReason = "District too small";
      }
    } else {
      if (precincts.length !== 0) {
        incorrectReason = "Not all precincts assigned";
      }
    }

    return <tr style={{backgroundColor: districtColors[id]}}>
      {/* TODO: maybe a fancier tooltip */}
      <td title={incorrectReason}>{incorrectReason ? "❌" : "✔"}</td>
      <th>{this.districtName(id)}</th>
      <td>{precincts.length}{idealSize && `/${idealSize}`}</td>
      {/* TODO: colors; generalize */}
      <td><Winner winner={winner} /></td>
      <td>{parties.R} {partyData.R.name}/{parties.D} {partyData.D.name}</td>
    </tr>
  }
}

DistrictRow.propTypes = {
  id: PropTypes.number.isRequired,
  idealSize: PropTypes.number,
  parties: PropTypes.objectOf(PropTypes.number),
  winner: PropTypes.string,
  // TODO: more precise type
  precincts: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DistrictRow;
