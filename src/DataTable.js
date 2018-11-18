// @flow
import React, { Component } from 'react';
import {partyData} from './constants';
import DistrictRow from './DistrictRow';
import {wastedVotes, efficiencyGap, mean, median} from './metrics';
import type {DistrictInfo, Party, PrecinctData} from './types';
import validate from './validate';
import {population, winner} from './util';
import Winner from  './Winner';

type Props = {|
  numDistricts: number,
  showParties: boolean,
  showMetrics: boolean,
  precinctStates: $ReadOnlyArray<number>,
  precincts: $ReadOnlyArray<PrecinctData>,
|}

class DataTable extends Component<Props> {
  render() {
    const {numDistricts, precincts, precinctStates} = this.props;

    const totalPop = population(precincts);
    const districtInfo = {};
    for (let i = 0 ; i <= numDistricts ; i++) {
      // TODO: figure out how to type this fn
      const info: any = {id: i, precincts: []};
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
    // $FlowIgnore
    Object.values(districtInfo).forEach((d: DistrictInfo) => {
      const maybeReason = validate(d);
      if (maybeReason) {
        invalidReason = invalidReason || `District ${d.id} ${maybeReason}`;
      }
    });

    const realDistricts = Object.values(districtInfo).filter(
        // $FlowIgnore
        (info: DistrictInfo) => info.id);

    let winners;
    let overallWinner;
    if (this.props.showParties) {
      winners = {R: 0, D: 0};
      realDistricts.forEach(info => {
        info.winner = winner(info.parties);
        if (info.winner) {
          winners[info.winner] += 1;
        }
      });
      overallWinner = winner(winners);
    }

    let wasted;
    let meanShareR;
    let medianShareR;
    if (this.props.showMetrics) {
      wasted = {R: 0, D: 0}
      realDistricts.forEach(info => {
        info.wasted = wastedVotes(info);
        Object.entries(info.wasted).map(
          // $FlowIgnore
          ([party, votes]: [Party, number]) => wasted[party] += votes);
      });
      meanShareR = mean(realDistricts);
      medianShareR = median(realDistricts);
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
          // $FlowIgnore
          (info: DistrictInfo) => <DistrictRow key={info.id} {...info} />)}
        </tbody>
      </table>
      {/* TODO(benkraft): separate component! */}
      <table className="global-data">
        <tbody>
          <tr>
            <th>Map Legality</th>
            {/* TODO: better align x/check here with dot by winner */}
            <td>{invalidReason ? `❌ ${invalidReason}` : "✔"}</td>
          </tr>
          {this.props.showParties && <tr>
            <th>Winner</th>
            {/* $FlowIgnore */}
            <td><Winner winner={overallWinner} />
            {invalidReason && " (so far)"}</td>
          </tr>}
          {this.props.showMetrics && <tr className="border"/>}
          {this.props.showMetrics && <tr>
            <th>Wasted Votes</th>
            <td>
              {/* $FlowIgnore */}
              {wasted.R} {partyData.R.name}/{wasted.D} {partyData.D.name}
            </td>
          </tr>}
          {this.props.showMetrics && <tr>
            <th>Efficiency Gap</th>
            {/* $FlowIgnore */}
            <td>{efficiencyGap(wasted, totalPop)}</td>
          </tr>}
          {this.props.showMetrics && <tr className="border"/>}
          {/* TODO: dedupe */}
          {this.props.showMetrics && <tr>
            <th>Mean</th>
            {/* TODO: maybe show both vote shares? */}
            {meanShareR === null ?
              <td>n/a</td> :
              // $FlowIgnore
              <td>{(meanShareR * 100).toFixed(0)}% {partyData.R.name}</td>}
          </tr>}
          {this.props.showMetrics && <tr>
            <th>Median</th>
            {medianShareR === null ?
              <td>n/a</td> :
              // $FlowIgnore
              <td>{(medianShareR * 100).toFixed(0)}% {partyData.R.name}</td>}
          </tr>}
          {this.props.showMetrics && <tr>
            <th>Difference</th>
            {meanShareR === null || medianShareR === null ?
              <td>n/a</td> :
              <td>
                {/* $FlowIgnore */
                 Math.abs((medianShareR - meanShareR) * 100).toFixed(0)}%
                ({medianShareR === meanShareR ?
                    "no" :
                    // $FlowIgnore
                    <Winner winner={medianShareR > meanShareR ? "R" : "D"} />}
                    {" "}advantage)
              </td>}
          </tr>}
        </tbody>
      </table>
    </div>;
  }
}

export default DataTable;
