import React from 'react';
import {population, sum} from './util';
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
    {gapR.toFixed(0)}% (<Winner winner={winner} /> advantage)
  </span>;
}

function voteShares(districtInfos) {
  let vals = [];
  Object.values(districtInfos).forEach(info => {
    if (info.precincts.length) {
      vals.push(info.parties.R / population(info.precincts));
    }
  });
  return vals;
}

function mean(districtInfos) {
  const shares = voteShares(districtInfos);
  if (!shares.length) {
    return null;
  } else {
    return sum(shares) / Object.keys(districtInfos).length;
  }
}

function median(districtInfos) {
  const shares = voteShares(districtInfos);
  shares.sort();
  if (!shares.length) {
    return null;
  } else if (shares.length % 2 === 0) {
    return (shares[shares.length / 2 - 1] + shares[shares.length / 2]) / 2;
  } else {
    return shares[(shares.length - 1) / 2];
  }
}

export {wastedVotes, efficiencyGap, mean, median};
