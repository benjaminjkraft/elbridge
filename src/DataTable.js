import React, { Component, PropTypes } from 'react';
import DistrictData from './DistrictData';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;
    const idealSize = precinctStates.length / numDistricts;

    const districtInfo = {};
    for (let i = 0 ; i <= numDistricts ; i++) {
      districtInfo[i] = {id: i, size: 0};
    }
    precincts.forEach((p, i) => {
      const district = precinctStates[i];
      const info = districtInfo[district];
      info.size += 1;
      if (p.party) {
        info.parties = info.parties || {R: 0, D: 0};
        info.parties[p.party] += 1;
      }
    });

    // TODO: block for overall stats
    return <div className="data-container">
      {Object.values(districtInfo).map(
          info => <DistrictData key={info.id} {...info} />)}
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
