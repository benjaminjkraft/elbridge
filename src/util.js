// Find the key for the larger of the values.
//
// obj should be an object with two keys and numerical values.  Returns the key
// corresponding to the larger value, or null if they are equal.
function winner(obj) {
  const [k1, k2] = Object.keys(obj);
  if (obj[k1] > obj[k2]) {
    return k1;
  } else if (obj[k2] > obj[k1]) {
    return k2;
  } else {
    return null;
  }
}

// Return whether the precincts are adjacent.
//
// Each argument should be an object with properties x, y, width, and height.
// TODO(benkraft): Maybe shouldn't allow just touching at corners?
function adjacent(precinct1, precinct2) {
  return (
    precinct1.x + precinct1.width >= precinct2.x
    && precinct2.x + precinct2.width >= precinct1.x
    && precinct1.y + precinct1.height >= precinct2.y
    && precinct2.y + precinct2.height >= precinct1.y);
}

// Return whether all precincts in the list are adjacent.
//
// See adjacent() above for details.
function contiguous(precincts) {
  // TODO(benkraft): Maybe there is a non-n^2 way?
  if (precincts.length <= 1) {
    return true;  // vacuously
  }
  console.log(precincts);

  // Build an adjacency list
  const adjacency = Array.from(precincts, () => []);
  precincts.forEach((p1, i) => {
    precincts.slice(i + 1).forEach((p2, j) => {
      if (adjacent(p1, p2)) {
        adjacency[i].push(j + i + 1);
        adjacency[j + i + 1].push(i);
      }
    });
  });

  // DFS on the list to see if we get to everything
  const found = adjacency.map(() => false);
  const stack = [0];
  while (stack.length) {
    let item = stack.pop();
    if (!found[item]) {
      found[item] = true;
      Array.prototype.push.apply(stack, adjacency[item]);
    }
  }

  return found.every(x => x);
}

export {winner, contiguous};
