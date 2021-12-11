console.time("Run time");
process.chdir(__dirname);
const testForFlash = require("./testForFlash");
let answer;

const lines = require("../common/getLinesOfFile")("./input").map(
  require("../common/map_splitAndParse")
);

let i = 0;
let hadSimul = false;

while (!hadSimul) {
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

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      const val = line[x];
      if (val > 9) {
        lines[y][x] = 0;
      }
    }
  }

  hadSimul = lines.every((line) => {
    return line.every((v) => v === 0);
  });

  if (!hadSimul) {
    i++;
  }
}

answer = i + 1;

console.info("Answer:", answer);
console.timeEnd("Run time");
