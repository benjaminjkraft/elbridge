// @flow
import type {PrecinctData, StatByParty} from './types';

// Find the key for the larger of the values.
//
// obj should be an object with two keys and numerical values.  Returns the key
// corresponding to the larger value, or null if they are equal.
function winner(obj: StatByParty): ?string {
  const [k1, k2] = Object.keys(obj);
  if (obj[k1] > obj[k2]) {
    return k1;
  } else if (obj[k2] > obj[k1]) {
    return k2;
  } else {
    return null;
  }
}

function parseQs(data: string): {[string]: string} {
  if (data[0] === '#' || data[0] === '?') {
    data = data.slice(1);
  }
  const retval = {};
  for (let item of data.split('&')) {
    let ix = item.indexOf('=');
    if (ix !== -1) {
      retval[decodeURIComponent(item.slice(0, ix))] = decodeURIComponent(
          item.slice(ix + 1));
    }
  }
  return retval;
}

function sum(vals: $ReadOnlyArray<number>): number {
  return vals.reduce((a, b) => a + b, 0);
}

function population(precincts: $ReadOnlyArray<PrecinctData>) {
  return sum(precincts.map(p => p.dots.length));
}

export {winner, parseQs, sum, population};
