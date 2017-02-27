import React, { Component, PropTypes } from 'react';
import {districtColors} from './Constants';

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
    return <div className="district-data"
                style={{backgroundColor: districtColors[id]}}>
      <div className="district-data-name">{this.districtName(id)}</div>
      <div>Precincts: {size}{idealSize && `/${idealSize}`}</div>
      {parties && <div>Party ID: {/* TODO: colors; generalize */
        `${parties.R} red/${parties.D} blue`}</div>}
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
