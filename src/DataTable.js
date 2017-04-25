import React, { Component, PropTypes } from 'react';
import DistrictRow from './DistrictRow';
import {winner} from './util';
import Winner from  './Winner';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;

    const districtInfo = {};
    for (let i = 0 ; i <= numDistricts ; i++) {
      const info = {id: i, size: 0, precincts: []};
      if (this.props.showParties) {
        info.parties = {R: 0, D: 0};
      }
      if (i) {
        info.idealSize = precinctStates.length / numDistricts;
      }
      districtInfo[i] = info;
    }
    precincts.forEach((p, i) => {
      const district = precinctStates[i];
      const info = districtInfo[district];
      if (this.props.showParties) {
        info.parties[p.party] += 1;
      }
      info.precincts.push(p);
    });

    let winners;
    let overallWinner;
    if (this.props.showParties) {
      winners = {R: 0, D: 0};
      Object.values(districtInfo).forEach(info => {
        if (info.id !== 0) {
          info.winner = winner(info.parties);
          winners[info.winner] += 1;
        }
      });
      overallWinner = winner(winners);
    }

    return <div className="data-container">
      <table className="district-data">
        <thead>
          <tr>
            <th></th>
            <th>District</th>
            <th>Precincts</th>
            {winners && <th>Winner</th>}
            {this.props.showParties && <th>Party ID</th>}
          </tr>
        </thead>
        <tbody>
        {Object.values(districtInfo).map(
          info => <DistrictRow key={info.id} {...info} />)}
        </tbody>
      </table>
      {overallWinner && <table className="global-data">
        <tbody>
          <tr>
            <th>Winner</th>
            <td><Winner winner={overallWinner} /></td>
          </tr>
          {/* TODO: more stats here */}
        </tbody>
      </table>}
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  showParties: PropTypes.bool.isRequired,
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
