console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input").map(
  require("../common/map_splitAndParse")
);

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  for (let x = 0; x < line.length; x++) {
    // Add code here
  }
}

console.info("Answer:", answer);
console.timeEnd("Run time");
