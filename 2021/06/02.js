console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

let fishStates = lines[0].split(",").map((f) => parseInt(f, 10));

// Initialize the array
let groupedByState = fishStates.reduce(
  (acc, v) => {
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  },
  [0, 0, 0, 0, 0, 0, 0, 0]
);

for (let dayNum = 1; dayNum <= 256; dayNum++) {
  const firstEl = groupedByState.shift();

  const numNewFish = firstEl;

  groupedByState[6] = (groupedByState[6] || 0) + firstEl;

  if (groupedByState[7] === undefined) {
    groupedByState[7] = 0;
  }

  groupedByState[8] = numNewFish;
}

answer = groupedByState.reduce((acc, v) => acc + v, 0);

console.info("Answer:", answer);
console.timeEnd("Run time");
