import React, { Component, PropTypes } from 'react';

class DataTable extends Component {
  render() {
    const {numDistricts, precinctStates} = this.props;
    const districtSize = precinctStates.length / numDistricts;

    const districtSizes = Array(numDistricts+1).fill(0);
    precinctStates.forEach(p => {districtSizes[p] += 1;});

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
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
