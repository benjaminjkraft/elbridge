// @flow
import React, { Component } from 'react';
import {districtColors, partyData} from './constants';
import type {DistrictInfo} from './types';
import {population} from './util';
import validate from './validate';
import Winner from './Winner';

class DistrictRow extends Component<DistrictInfo> {
  districtName(id: number) {
    if (id === 0) {
      return "Unassigned";
    } else {
      return `District ${id}`;
    }
  }

  render () {
    const {id, idealSize, parties, wasted, winner, precincts} = this.props;

    let invalidReason;
    if (id) {
      invalidReason = validate(this.props);
      if (invalidReason) {
        invalidReason = `District is ${invalidReason}`;
      }
    } else {
      if (precincts.length !== 0) {
        invalidReason = "Not all precincts assigned";
      }
    }

    return <tr style={{backgroundColor: districtColors[id]}}>
      {/* TODO: maybe a fancier tooltip */}
      <td title={invalidReason}>{invalidReason ? "❌" : "✔"}</td>
      <th>{this.districtName(id)}</th>
        <td>{population(precincts)}{idealSize && `/${idealSize}`}</td>
      {/* $FlowIgnore: figure out why it can't deduce that winner is here */}
      {parties && <td><Winner winner={winner} /></td>}
      {/* TODO: generalize */}
      {/* TODO: extract common parts */}
      {parties && <td>
        {parties.R} {partyData.R.name}/{parties.D} {partyData.D.name}</td>}
      {wasted && <td>
        {wasted.R} {partyData.R.name}/{wasted.D} {partyData.D.name}</td>}
    </tr>
  }
}

export default DistrictRow;
