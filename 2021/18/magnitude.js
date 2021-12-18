const assert = require("assert");

function _magn(arr) {
  const v = arr.reduce((a, c, i) => {
    let newValue;
    if (Array.isArray(c)) {
      newValue = _magn(c);
    } else {
      newValue = c;
    }
    if (i === 0) {
      newValue = 3 * newValue;
    } else {
      newValue = 2 * newValue;
    }
    return a + newValue;
  }, 0);

  return v;
}

function magnitude(str) {
  const arr = JSON.parse(str);
  return _magn(arr);
}

assert.equal(magnitude("[[1,2],[[3,4],5]]"), 143);
assert.equal(magnitude("[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"), 1384);
assert.equal(magnitude("[[[[1,1],[2,2]],[3,3]],[4,4]]"), 445);
assert.equal(magnitude("[[[[3,0],[5,3]],[4,4]],[5,5]]"), 791);
assert.equal(magnitude("[[[[5,0],[7,4]],[5,5]],[6,6]]"), 1137);
assert.equal(
  magnitude("[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]"),
  3488
);
assert.equal(
  magnitude("[[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]"),
  4140
);

module.exports = magnitude;
