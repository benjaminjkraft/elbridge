import React, { Component, PropTypes } from 'react';
import {partyData} from './constants';
import DistrictRow from './DistrictRow';
import {wastedVotes, efficiencyGap} from './metrics';
import validate from './validate';
import {population, winner} from './util';
import Winner from  './Winner';

class DataTable extends Component {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;

    const totalPop = population(precincts);
    const districtInfo = {};
    for (let i = 0 ; i <= numDistricts ; i++) {
      const info = {id: i, precincts: []};
      if (this.props.showParties) {
        info.parties = {R: 0, D: 0};
      }
      if (i) {
        info.idealSize = totalPop / numDistricts;
      }
      districtInfo[i] = info;
    }
    precincts.forEach((p, i) => {
      const district = precinctStates[i];
      const info = districtInfo[district];
      if (this.props.showParties) {
        info.parties[p.party] += p.dots.length;
      }
      info.precincts.push(p);
    });

    let invalidReason = null;
    Object.values(districtInfo).forEach(d => {
      const maybeReason = validate(d);
      if (maybeReason) {
        invalidReason = invalidReason || `District ${d.id} ${maybeReason}`;
      }
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

    let wasted;
    if (this.props.showMetrics) {
      wasted = {R: 0, D: 0}
      Object.values(districtInfo).forEach(info => {
        info.wasted = wastedVotes(info);
        Object.entries(info.wasted).map(
          ([party, votes]) => wasted[party] += votes);
      });
    }

    return <div className="data-container">
      <table className="district-data">
        <thead>
          <tr>
            <th>Legal</th>
            <th>District</th>
            <th>Pop.</th>
            {winners && <th>Winner</th>}
            {this.props.showParties && <th>Party ID</th>}
            {this.props.showMetrics && <th>Wasted Votes</th>}
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
            <th>Map legality</th>
            {/* TODO: better align x/check here with dot by winner */}
            <td>{invalidReason ? `❌ ${invalidReason}` : "✔"}</td>
          </tr>
          {this.props.showParties && <tr>
            <th>Winner</th>
            <td><Winner winner={overallWinner} />
            {invalidReason && " (so far)"}</td>
          </tr>}
          {this.props.showMetrics && <tr className="border"/>}
          {this.props.showMetrics && <tr>
            <th>Wasted Votes</th>
            <td>
              {wasted.R} {partyData.R.name}/{wasted.D} {partyData.D.name}
            </td>
          </tr>}
          {this.props.showMetrics && <tr>
            <th>Efficiency Gap</th>
            <td>{efficiencyGap(wasted, totalPop)}</td>
          </tr>}
          {/* TODO: more stats here */}
        </tbody>
      </table>
    </div>;
  }
}

DataTable.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  showParties: PropTypes.bool.isRequired,
  showMetrics: PropTypes.bool.isRequired,
  precinctStates: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default DataTable;
