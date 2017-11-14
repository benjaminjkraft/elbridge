import React from 'react';
import {population} from './util';
import Winner from  './Winner';

function wastedVotes(districtInfo) {
  const votes = Object.assign({}, districtInfo.parties);
  votes[districtInfo.winner] -= population(districtInfo.precincts) / 2
  return votes
}

function efficiencyGap(wasted, totalPop){
  if (wasted.R === wasted.D) {
    return "0% (no advantage)";
  }

  let gapR = 100 * (wasted.R - wasted.D) / totalPop;
  const winner = gapR > 0 ? "D" : "R";
  gapR = Math.abs(gapR);
  return <span>
    {gapR.toFixed(1)}% (<Winner winner={winner} /> advantage)
  </span>;
}

export {wastedVotes, efficiencyGap};
