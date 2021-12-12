console.time("Run time");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile).map(
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
