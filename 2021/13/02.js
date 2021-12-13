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

const SIZE_PER_SQUARE = 50;
const { createCanvas } = require("canvas");
const canvas = createCanvas(
  (maxX + 3) * SIZE_PER_SQUARE,
  (maxY + 3) * SIZE_PER_SQUARE
);
const ctx = canvas.getContext("2d");

ctx.fillStyle = `black`;
ctx.fillRect(0, 0, (maxX + 3) * SIZE_PER_SQUARE, (maxY + 3) * SIZE_PER_SQUARE);
let output = "";
for (let y = -1; y <= maxY + 1; y++) {
  for (let x = -1; x <= maxX + 1; x++) {
    const c = uniqCoords.find((c) => c[0] === x && c[1] === y);
    if (c) {
      output += "#";
      ctx.fillStyle = `white`;
    } else {
      output += " ";
      ctx.fillStyle = `black`;
    }
    ctx.fillRect(
      (x + 1) * SIZE_PER_SQUARE,
      (y + 1) * SIZE_PER_SQUARE,
      (x + 2) * SIZE_PER_SQUARE,
      (y + 2) * SIZE_PER_SQUARE
    );
  }
  output += "\n";
}
const buff = canvas.toBuffer("image/png");
require("fs").writeFileSync(
  require("path").join(__dirname, "2021_13_2.png"),
  buff
);

answer = output;

console.info("Answer:", "\n" + answer);
console.timeEnd("Run time");
