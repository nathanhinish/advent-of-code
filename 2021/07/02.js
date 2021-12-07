console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const positions = lines[0].split(",").map((v) => parseInt(v, 10));

const minPos = Math.min(...positions);
const maxPos = Math.max(...positions);

let leastDiff = Number.POSITIVE_INFINITY;

const fibs = [0, 1];
for (let i = 2; i <= maxPos; i++) {
  fibs[i] = i + fibs[i - 1];
}

for (let i = minPos; i <= maxPos; i++) {
  const diffs = positions.map((v) => Math.abs(v - i));
  const costs = diffs.map((v) => fibs[v], 0);

  const diff = costs.reduce((acc, v) => acc + v, 0);
  if (diff < leastDiff) {
    leastDiff = diff;
    bestPos = i;
  }
}

answer = leastDiff;
console.info("Answer:", answer);
console.timeEnd("Run time");
