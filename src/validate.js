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

/**
 * Validate a district.
 *
 * Returns a reason (e.g. "is not contiguous") or null if the district is
 * valid.
 */
function validate(districtInfo) {
  let incorrectReason = null;
  if (districtInfo.id) {
    if (!contiguous(districtInfo.precincts)) {
      incorrectReason = "is not contiguous";
    } else if (districtInfo.precincts.length > districtInfo.idealSize) {
      incorrectReason = "is too large";
    } else if (districtInfo.precincts.length < districtInfo.idealSize) {
      incorrectReason = "is too small";
    }
  }

  return incorrectReason;
}

export default validate;
