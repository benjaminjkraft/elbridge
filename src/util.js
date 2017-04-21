// Find the key for the larger of the values
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

export {winner};