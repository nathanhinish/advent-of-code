console.time("Run time");
process.chdir(__dirname);
const testForFlash = require("./testForFlash");

let answer;

const lines = require("../common/getLinesOfFile")("./input");

const states = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

let numFlashes = 0;
for (let i = 0; i < 100; i++) {
  let hasFlashed = [];

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      line[x] = line[x] + 1;
    }
  }

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      try {
        testForFlash(states, y, x, hasFlashed);
      } catch (err) {
        console.info("ERROR on iter", i);
        throw err;
      }
    }
  }

  numFlashes += hasFlashed.length;

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      const val = line[x];
      if (val > 9) {
        states[y][x] = 0;
      }
    }
  }
}

answer = numFlashes;

console.info("Answer:", answer);
console.timeEnd("Run time");
