import React, { Component, PropTypes } from 'react';
import DistrictRow from './DistrictRow';
import {partyData} from './Constants';
import {winner} from './util';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;

    const districtInfo = {};
    for (let i = 0 ; i <= numDistricts ; i++) {
      const info = {id: i, size: 0, parties: {R: 0, D: 0}, precincts: []};
      if (i) {
        info.idealSize = precinctStates.length / numDistricts;
      }
      districtInfo[i] = info;
    }
    precincts.forEach((p, i) => {
      const district = precinctStates[i];
      const info = districtInfo[district];
      info.size += 1;
      info.parties[p.party] += 1;
      info.precincts.push(p);  // TODO: inline stuff to use this directly
    });

    const winners = {R: 0, D: 0};
    Object.values(districtInfo).forEach(info => {
      if (info.id !== 0) {
        info.winner = winner(info.parties);
        winners[info.winner] += 1;
      }
    });
    const overallWinner = winner(winners);

    return <div className="data-container">
      <table className="district-data">
        <thead>
          <tr>
            <th></th>
            <th>District</th>
            <th>Precincts</th>
            <th>Winner</th>
            <th>Party ID</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(districtInfo).map(
          info => <DistrictRow key={info.id} {...info} />)}
        </tbody>
      </table>
      <table className="global-data">
        <tbody>
          <tr>
            <th>Winner</th>
            <td>{overallWinner ? partyData[overallWinner].name : "tie"}</td>
          </tr>
          {/* TODO: more stats here */}
        </tbody>
      </table>
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
