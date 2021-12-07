console.time("Run time");
process.chdir(__dirname);
const sort_numerical = require("../common/sort_numerical");
const filter_unique = require("../common/filter_unique");
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const positions = lines[0]
  .split(",")
  .map((v) => parseInt(v, 10))
  .sort(sort_numerical);

const minPos = Math.min(...positions);
const maxPos = Math.max(...positions);

let leastCost = Number.POSITIVE_INFINITY;

// Get unique positions
const uniqPositions = positions.filter(filter_unique);

// Get number of instances of each unique position
const numOfPosInstances = [];
for (let i = 0; i < uniqPositions.length; i++) {
  const pos = uniqPositions[i];
  numOfPosInstances[pos] = positions.filter((v) => v === pos).length;
}

for (let moveToPos = minPos; moveToPos <= maxPos; moveToPos++) {
  const costPerPosition = [];
  for (let uniqCrab = 0; uniqCrab < uniqPositions.length; uniqCrab++) {
    const startPos = uniqPositions[uniqCrab];
    const diff = Math.abs(startPos - moveToPos);
    if (diff > 0) {
      costPerPosition[uniqCrab] =
        ((diff * diff + diff) / 2) /* gauss */ * numOfPosInstances[startPos];
    }
  }
  const totalCost = costPerPosition.reduce((acc, v) => acc + (v || 0), 0);
  if (totalCost < leastCost) {
    leastCost = totalCost;
    bestPos = moveToPos;
  }
}

answer = leastCost;
console.info("Answer:", answer);
console.timeEnd("Run time");
