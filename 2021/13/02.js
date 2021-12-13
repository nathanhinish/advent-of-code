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

for (let f = 0; f < folds.length; f++) {
  const instr = folds[f];
  const partToTest = instr.includes("x=") ? 0 : 1;
  const position = parseInt(instr.replace(/\w=/, ""), 10);

  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const value = coord[partToTest];
    if (value > position) {
      const newVal = 2 * position - value;

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

const uniqCoords = coords
  .map(coordToStr)
  .filter(require("../common/filter_unique"))
  .map((s) => s.split(",").map((v) => parseInt(v, 10)));

const maxX = Math.max(...uniqCoords.map((c) => c[0]));
const maxY = Math.max(...uniqCoords.map((c) => c[1]));

let output = "";
for (let y = 0; y <= maxY; y++) {
  for (let x = 0; x <= maxX; x++) {
    const c = uniqCoords.find((c) => c[0] === x && c[1] === y);
    if (c) {
      output += "#";
    } else {
      output += " ";
    }
  }
  output += "\n";
}

answer = output.trim();

console.info("Answer:", "\n\n" + answer + "\n");
console.timeEnd("Run time");
