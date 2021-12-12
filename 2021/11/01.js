console.time("Run time");
const testForFlash = require("./testForFlash");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile).map(
  require("../common/map_splitAndParse")
);

let numFlashes = 0;
for (let i = 0; i < 100; i++) {
  let hasFlashed = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      line[x] = line[x] + 1;
    }
  }

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      try {
        testForFlash(lines, y, x, hasFlashed);
      } catch (err) {
        console.info("ERROR on iter", i);
        throw err;
      }
    }
  }

  numFlashes += hasFlashed.length;

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const val = line[x];
      if (val > 9) {
        lines[y][x] = 0;
      }
    }
  }
}

answer = numFlashes;

console.info("Answer:", answer);
console.timeEnd("Run time");
