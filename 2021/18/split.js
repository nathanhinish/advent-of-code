const assert = require("assert");
const findLargeInt = require("./findLargeInt");

function split(str) {
  const result = findLargeInt(str);
  if (!result) {
    return str;
  }

  const [digits, index] = result;

  const val = Number(digits);
  const newVal = [Math.floor(val / 2), Math.ceil(val / 2)];

  str =
    str.substring(0, index) +
    JSON.stringify(newVal) +
    str.substring(index + digits.length);

  return str;
}

assert.equal(
  split("[[[[0,7],4],[15,[0,13]]],[1,1]]"),
  "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]"
);

module.exports = split;
