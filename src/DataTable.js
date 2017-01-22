import React, { Component, PropTypes } from 'react';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts} = this.props;
    const districtSize = Object.keys(precincts).length / numDistricts;

    const districtSizes = {};
    for (let i = 0; i <= numDistricts; i++) {
      districtSizes[i] = 0;
    }
    Object.entries(precincts).forEach(
        ([_, p]) => {districtSizes[p.props.district] += 1;});

    return <div className="data-container">
      {Object.entries(districtSizes).map(
        ([d, size]) => <span key={d} className="data-line">
          {d === "0" ?
            `Unassigned: ${size}` :
            `District ${d}: ${size}/${districtSize}`}
        </span>)}
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  precincts: PropTypes.objectOf(PropTypes.element).isRequired,
}

export default DataTable;
