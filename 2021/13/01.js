console.time("Run time");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile);
const blankIndex = lines.findIndex((l) => l === "");
const coords = lines
  .slice(0, blankIndex)
  .map((l) => l.split(",").map((v) => parseInt(v, 10)));
const folds = lines
  .slice(blankIndex + 1)
  .map((l) => l.replace("fold along ", ""));

let dots = [];

function coordToStr(c) {
  return `${c[0]},${c[1]}`;
}

for (let f = 0; f < 1; f++) {
  const instr = folds[f];
  const partToTest = instr.includes("x=") ? 0 : 1;
  const position = parseInt(instr.replace(/\w=/, ""), 10);

  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const value = coord[partToTest];
    if (value > position) {
      const newVal = value - 2 * (value - position);

      if (partToTest === 0) {
        // x
        coord[0] = newVal;
      } else {
        // y
        coord[1] = newVal;
      }
    }
  }
}

answer = coords
  .map(coordToStr)
  .filter(require("../common/filter_unique")).length;

console.info("Answer:", answer);
console.timeEnd("Run time");
