const assert = require("assert");
const findIntPair = require("./findIntPair");
const findNextNumber = require("./findNextNumber");

function explode(str, debug = false) {
  const incoming = str;
  const pairResult = findIntPair(str);

  if (!pairResult) {
    return str;
  }

  const [pairStr, pairIndex] = pairResult;

  const parsedPair = JSON.parse(pairStr);

  const leftResult = findNextNumber(str, pairIndex, -1);
  const rightResult = findNextNumber(str, pairIndex + pairStr.length, 1);

  if (rightResult) {
    const [number, index] = rightResult;
    const newValue = Number(number) + parsedPair[1];
    str =
      str.substring(0, index) + newValue + str.substring(index + number.length);
  }
  str =
    str.substring(0, pairIndex) +
    "0" +
    str.substring(pairIndex + pairStr.length);

  if (leftResult) {
    const [number, index] = leftResult;
    const newValue = Number(number) + parsedPair[0];
    str =
      str.substring(0, index) + newValue + str.substring(index + number.length);
  }

  try {
    JSON.parse(str);
  } catch (err) {
    console.info(incoming);
    console.info(pairStr, pairIndex, leftResult, rightResult);
    console.info(str);
    throw err;
  }

  return str;
}

assert.equal(
  explode("[[[[4,0],[5,4]],[[7,0],[15,5]]],[10,[[0,[11,3]],[[6,3],[8,8]]]]]"),
  "[[[[4,0],[5,4]],[[7,0],[15,5]]],[10,[[11,0],[[9,3],[8,8]]]]]"
);

assert.equal(explode("[[[[[9,8],1],2],3],4]"), "[[[[0,9],2],3],4]");
assert.equal(explode("[7,[6,[5,[4,[3,2]]]]]"), "[7,[6,[5,[7,0]]]]");
assert.equal(explode("[[6,[5,[4,[3,2]]]],1]"), "[[6,[5,[7,0]]],3]");
assert.equal(
  explode("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"),
  "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"
);
assert.equal(
  explode("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"),
  "[[3,[2,[8,0]]],[9,[5,[7,0]]]]"
);

assert.equal(
  explode(
    "[[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],[[[5,[2,8]],4],[5,[[9,9],0]]]]"
  ),
  "[[[[5,0],[[9,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],[[[5,[2,8]],4],[5,[[9,9],0]]]]"
);

assert.equal(
  explode(
    "[[[[4,5],[5,0]],[[6,7],[7,7]]],[[[7,[32471,32472]],85],[[11,9],[11,0]]]]"
  ),
  "[[[[4,5],[5,0]],[[6,7],[7,7]]],[[[32478,0],32557],[[11,9],[11,0]]]]"
);

module.exports = explode;
