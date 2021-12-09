console.time("Run time");
const isLowPoint = require("./isLowPoint");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const spots = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

// Add code here
const lows = [];
for (let y = 0; y < spots.length; y++) {
  const line = spots[y];
  for (let x = 0; x < line.length; x++) {
    if (isLowPoint(spots, x, y)) {
      lows.push(spots[y][x]);
    }
  }
}

answer = lows.reduce((a, v) => a + v, 0) + lows.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
