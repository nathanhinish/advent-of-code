const assert = require("assert");

const LARGE_INT_RE = /(\d{2,})/;

function findLargeInt(str) {
  let match = LARGE_INT_RE.exec(str);
  if (match) {
    return [match[0], match.index];
  }

  return null;
}

assert.strictEqual(findLargeInt("[[[[[9,8],1],2],3],4]"), null);
assert.deepEqual(findLargeInt("[7,[6,[53,[4,[3,2]]]]]"), ["53", 7]);
assert.deepEqual(findLargeInt("[[6,[5,[4,[3,21]]]],1]"), ["21", 13]);
assert.deepEqual(findLargeInt("[[3,[2,[1,[73,3]]]],[6,[5,[4,[31,2]]]]]"), [
  "73",
  11,
]);
assert.deepEqual(findLargeInt("[[3,[2,[8,0]]],[9,[5,[4,[3,21]]]]]"), [
  "21",
  27,
]);

module.exports = findLargeInt;
