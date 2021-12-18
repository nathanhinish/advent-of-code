const assert = require("assert");
const isDigit = require("./isDigit");

function findIntPair(str) {
  let currentDepth = 0;
  let currentIndex = 0;
  let intPair;
  while (currentIndex < str.length && !intPair) {
    const char = str[currentIndex];
    if (char === "[") {
      currentDepth++;
    } else if (char === "]") {
      currentDepth--;
    } else if (currentDepth > 4 && isDigit(char)) {
      const nextCommaIndex = str.indexOf(",", currentIndex);
      if (isDigit(str[nextCommaIndex + 1])) {
        const prevBracketIndex = str.lastIndexOf("[", currentIndex);
        const nextBracketIndex = str.indexOf("]", currentIndex);
        intPair = str.substring(prevBracketIndex, nextBracketIndex + 1);
        currentIndex = prevBracketIndex;
      }
    }
    if (!intPair) {
      currentIndex++;
    }
  }
  if (!intPair) {
    return null;
  }
  return [intPair, currentIndex];
}

assert.deepEqual(findIntPair("[[[[[9,8],1],2],3],4]"), ["[9,8]", 4]);
assert.deepEqual(findIntPair("[7,[6,[5,[4,[3,2]]]]]"), ["[3,2]", 12]);
assert.deepEqual(findIntPair("[[6,[5,[4,[3,2]]]],1]"), ["[3,2]", 10]);
assert.deepEqual(findIntPair("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"), [
  "[7,3]",
  10,
]);
assert.deepEqual(findIntPair("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"), [
  "[3,2]",
  24,
]);

module.exports = findIntPair;
