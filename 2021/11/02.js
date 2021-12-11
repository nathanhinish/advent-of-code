console.time("Run time");
process.chdir(__dirname);
const testForFlash = require("./testForFlash");
let answer;

const lines = require("../common/getLinesOfFile")("./input");

const states = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

let i = 0;
let hadSimul = false;

while (!hadSimul) {
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

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      const val = line[x];
      if (val > 9) {
        states[y][x] = 0;
      }
    }
  }

  hadSimul = states.every((line) => {
    return line.every((v) => v === 0);
  });

  if (!hadSimul) {
    i++;
  }
}

answer = i + 1;

console.info("Answer:", answer);
console.timeEnd("Run time");
