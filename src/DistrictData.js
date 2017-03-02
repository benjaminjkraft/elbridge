import React, { Component, PropTypes } from 'react';
import {districtColors, partyNames} from './Constants';

class DistrictData extends Component {
  districtName(id) {
    if (id === 0) {
      return "Unassigned";
    } else {
      return `District ${id}`;
    }
  }

  render () {
    const {id, size, idealSize, parties} = this.props;
    var winner;
    if (parties && id !== 0) {
      if (parties.R > parties.D) {
        winner = partyNames.R;
      } else if (parties.D > parties.R) {
        winner = partyNames.D;
      } else {
        winner = 'tie';
      }
    }
    return <div className="district-data"
                style={{backgroundColor: districtColors[id]}}>
      <div className="district-data-name">{this.districtName(id)}</div>
      <div>Precincts: {size}{idealSize && `/${idealSize}`}</div>
      {/* TODO: colors; generalize */}
      {parties && <div>
        Party ID: {parties.R} {partyNames.R}/{parties.D} {partyNames.D}
        </div>}
      {winner && <div>Winner: {winner}</div>}
    </div>
  }
}

DistrictData.propTypes = {
  id: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  idealSize: PropTypes.number,
  parties: PropTypes.objectOf(PropTypes.number),
}

export default DistrictData;
