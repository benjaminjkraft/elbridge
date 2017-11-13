import React, { Component, PropTypes } from 'react';
import {districtColors, partyData} from './Constants';
import validate from './validate';
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

    let invalidReason;
    if (id) {
      invalidReason = validate(this.props);
      if (invalidReason) {
        invalidReason = `District is ${invalidReason}`;
      }
    } else {
      if (precincts.length !== 0) {
        invalidReason = "Not all precincts assigned";
      }
    }

    return <tr style={{backgroundColor: districtColors[id]}}>
      {/* TODO: maybe a fancier tooltip */}
      <td title={invalidReason}>{invalidReason ? "❌" : "✔"}</td>
      <th>{this.districtName(id)}</th>
      <td>{precincts.length}{idealSize && `/${idealSize}`}</td>
      {/* TODO: generalize */}
      {parties && <td><Winner winner={winner} /></td>}
      {parties && <td>
        {parties.R} {partyData.R.name}/{parties.D} {partyData.D.name}</td>}
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
