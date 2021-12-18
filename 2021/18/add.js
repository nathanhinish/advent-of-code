const assert = require("assert");

function add(a, b) {
  try {
    a = JSON.parse(a);
  } catch (err) {
    throw new Error("Could not parse a");
  }
  try {
    b = JSON.parse(b);
  } catch (err) {
    throw new Error("Could not parse b");
  }

  return JSON.stringify([a, b]);
}

assert.equal(
  add("[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]"),
  "[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"
);

module.exports = add;
