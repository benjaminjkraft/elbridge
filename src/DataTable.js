import React, { Component, PropTypes } from 'react';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;
    const idealSize = precinctStates.length / numDistricts;

    const districtInfo = {};
    precincts.forEach((p, i) => {
        const district = precinctStates[i];
        districtInfo[district] = districtInfo[district] || {
            size: 0,
            parties: {R: 0, D: 0}
        };
        districtInfo[district].size += 1;
        if (p.party) {
            districtInfo[district].parties[p.party] += 1;
        }
    });

    return <div className="data-container">
      {Object.entries(districtInfo).map(
        ([d, info]) => <span key={d} className="data-line">
          {d === "0" ?
            `Unassigned: ${info.size}` :
            `District ${d}: ${info.size}/${idealSize}`}
          {d !== "0" && (info.parties.R || info.parties.D) ? /* TODO: colors */
            `; ${info.parties.R} red/${info.parties.D} blue` : null}
        </span>)}
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
