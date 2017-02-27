import React, { Component, PropTypes } from 'react';

class DistrictData extends Component {
  render () {
    const {name, size, idealSize, parties} = this.props;
    return <div className="district-data">
      <div className="district-data-name">{name}</div>
      <div>Precincts: {size}{idealSize && `/${idealSize}`}</div>
      <div>{parties && /* TODO: colors; generalize */
        `Party ID: ${parties.R} red/${parties.D} blue`}</div>
    </div>
  }
}

DistrictData.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  idealSize: PropTypes.number,
  parties: PropTypes.objectOf(PropTypes.number),
}

export default DistrictData;
