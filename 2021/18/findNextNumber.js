const assert = require("assert");
const isDigit = require("./isDigit");

function findNextNumber(str, startIndex, direction) {
  let currentIndex = startIndex;
  const terminatingValue = direction === 1 ? str.length : 0;
  while (currentIndex !== terminatingValue) {
    const char = str[currentIndex];
    if (isDigit(char)) {
      let number = char;
      let otherDigitIndex = currentIndex;
      while (isDigit(str[otherDigitIndex + direction])) {
        otherDigitIndex += direction;
      }

      if (otherDigitIndex < currentIndex) {
        const temp = otherDigitIndex;
        otherDigitIndex = currentIndex;
        currentIndex = temp;
      }
      number = str.substring(currentIndex, otherDigitIndex + 1);

      return [number, currentIndex];
    }
    currentIndex += direction;
  }
  return null;
}

let str = "[[[[[9,8],1],2],3],4]";
assert.strictEqual(findNextNumber(str, 4, -1), null);
assert.deepEqual(findNextNumber(str, 8, 1), ["1", 10]);

str = "[7,[6,[5,[4,[3,2]]]]]";
assert.deepEqual(findNextNumber(str, 12, -1), ["4", 10]);
assert.strictEqual(findNextNumber(str, 16, 1), null);

str = "[[6,[5,[4,[3,2]]]],1]";
assert.deepEqual(findNextNumber(str, 10, -1), ["4", 8]);
assert.deepEqual(findNextNumber(str, 14, 1), ["1", 19]);

str = "[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]";
assert.deepEqual(findNextNumber(str, 10, -1), ["1", 8]);
assert.deepEqual(findNextNumber(str, 14, 1), ["6", 20]);

str = "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]";
assert.deepEqual(findNextNumber(str, 24, -1), ["4", 22]);
assert.strictEqual(findNextNumber(str, 28, 1), null);

str = "[[3,[24,[8,0]]],[9,[5,[40,[3,2]]]]]";
assert.deepEqual(findNextNumber(str, 24, -1), ["40", 23]);
assert.deepEqual(findNextNumber(str, 3, 1), ["24", 5]);

module.exports = findNextNumber;
