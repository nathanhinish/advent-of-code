console.time("Run time");

let answer;

const inputFile = process.argv[2];

const findShortestPathBellmanFord = require("./findShortestPathBellmanFord");
const coordToStr = require("../common/coordToStr.js");
const riskAtPos = require("../common/getLinesOfFile")(inputFile).map((l) =>
  l.split("").map((c) => parseInt(c, 10))
);

// y, x
const START = [0, 0];
const FINISH = [
  riskAtPos.length - 1,
  Math.max(...riskAtPos.map((l) => l.length)) - 1,
];

const graphBF = [];
// construct graph
for (let y = 0; y < riskAtPos.length; y++) {
  const row = riskAtPos[y];
  for (let x = 0; x < row.length; x++) {
    const coordStr = coordToStr([y, x]);
    const distances = {};
    const coordsToAdd = [];
    if (y > 0) {
      coordsToAdd.push([y - 1, x]);
    }
    if (y < riskAtPos.length - 1) {
      coordsToAdd.push([y + 1, x]);
      distances[coordToStr([y + 1, x])] = riskAtPos[y + 1][x];
    }

    if (x > 0) {
      coordsToAdd.push([y, x - 1]);
      distances[coordToStr([y, x - 1])] = row[x - 1];
    }
    if (x < row.length - 1) {
      coordsToAdd.push([y, x + 1]);
      distances[coordToStr([y, x + 1])] = row[x + 1];
    }

    coordsToAdd.forEach((to) => {
      const toStr = coordToStr(to);
      const weight = riskAtPos[to[0]][to[1]];
      distances[toStr] = weight;
      graphBF.push([coordStr, toStr, weight]);
    });
  }
}

const output = findShortestPathBellmanFord(
  graphBF,
  coordToStr(START),
  coordToStr(FINISH)
);

answer = output;

console.info("Answer:", answer);
console.timeEnd("Run time");
