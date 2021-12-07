console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const positions = lines[0].split(",").map((v) => parseInt(v, 10));

const minPos = Math.min(...positions);
const maxPos = Math.max(...positions);

let leastDiff = Number.POSITIVE_INFINITY;

for (let i = minPos; i <= maxPos; i++) {
  const diff = positions.reduce((acc, v) => {
    return acc + Math.abs(v - i);
  }, 0);
  if (diff < leastDiff) {
    leastDiff = diff;
  }
}
answer = leastDiff;
console.info("Answer:", answer);
console.timeEnd("Run time");
