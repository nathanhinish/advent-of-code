const util = require("util");
const assert = require("assert");
const explode = require("./explode");
const split = require("./split");

function printArr(str) {
  const a = JSON.parse(str);
  return util.inspect(a, {
    depth: null,
    colors: true,
  });
}

function reduce(str) {
  let numReductions = 0;
  // console.info("RED", str);
  let noChange = false;
  let lastRoundUpdate = str;

  while (!noChange) {
    let newUpdates = lastRoundUpdate;

    let changeFromExplode = true;
    while (changeFromExplode) {
      const afterExplode = explode(newUpdates);
      changeFromExplode = afterExplode !== newUpdates;
      if (changeFromExplode) {
        numReductions++;
        // console.info("EEE", afterExplode);
      }
      newUpdates = afterExplode;
    }

    const changeBeforeSplit = newUpdates;
    newUpdates = split(newUpdates);
    if (changeBeforeSplit !== newUpdates) {
      numReductions++;
      // console.info("SSS", newUpdates);
    }

    noChange = newUpdates === lastRoundUpdate;
    lastRoundUpdate = newUpdates;

    if (numReductions > 2500) {
      throw new Error("probably wrong");
    }
  }

  return lastRoundUpdate;
}

assert.equal(
  explode("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"),
  "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]"
);

assert.equal(
  explode("[[[[0,7],4],[7,[[8,4],9]]],[1,1]]"),
  "[[[[0,7],4],[15,[0,13]]],[1,1]]"
);

assert.equal(
  split("[[[[0,7],4],[15,[0,13]]],[1,1]]"),
  "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]"
);

assert.equal(
  split("[[[[0,7],4],[[7,8],[0,13]]],[1,1]]"),
  "[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]"
);

assert.equal(
  explode("[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]"),
  "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"
);

assert.equal(
  reduce("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"),
  "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]"
);

module.exports = reduce;
