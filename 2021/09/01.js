console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const spots = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

// Add code here
const lows = [];
for (let y = 0; y < spots.length; y++) {
  const line = spots[y];
  const prevLine = y > 0 ? spots[y - 1] : null;
  const nextLine = y < spots.length - 1 ? spots[y + 1] : null;
  for (let x = 0; x < line.length; x++) {
    let isLow = true;
    // left
    const val = line[x];
    if (x > 0 && line[x - 1] <= val) {
      if (y === 16) {
        // console.info(x, y, val, "left");
      }
      isLow = false;
    } else if (x < line.length - 1 && line[x + 1] <= val) {
      if (y === 16) {
        // console.info(x, y, val, "right");
      }
      isLow = false;
    } else if (prevLine && prevLine[x] <= val) {
      if (y === 16) {
        // console.info(x, y, val, "top");
      }
      isLow = false;
    } else if (nextLine && nextLine[x] <= val) {
      if (y === 16) {
        // console.info(x, y, val, "bottom");
      }
      isLow = false;
    }

    if (y === 16) {
      // console.info(x, y, "=", val, isLow);
    }
    if (isLow) {
      console.info(x, y, "=", val);
      lows.push(val);
      riskLevel += val + 1;
    }
  }
}

answer = lows.reduce((a, v) => a + v, 0) + lows.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
