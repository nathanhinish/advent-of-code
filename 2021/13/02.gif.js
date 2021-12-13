console.time("Run time");

const path = require("path");
const fs = require("fs");
const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");
const uniqFilter = require("../common/filter_unique");
const coordToStr = require("../common/coordToStr");

let answer;

const inputFile = process.argv[2];

const SIZE_PER_SQUARE = 10;
const OUTPUT_FILE_PATH = path.join(__dirname, "2021_13_2.gif");

const lines = require("../common/getLinesOfFile")(inputFile);
const blankIndex = lines.findIndex((l) => l === "");
const coords = lines
  .slice(0, blankIndex)
  .map((l) => l.split(",").map((v) => parseInt(v, 10)));
const folds = lines
  .slice(blankIndex + 1)
  .map((l) => l.replace("fold along ", ""));

const maxX = Math.max(...coords.map((c) => c[0]));
const maxY = Math.max(...coords.map((c) => c[1]));

const encoder = new GIFEncoder(
  (maxX + 1) * SIZE_PER_SQUARE,
  (maxY + 1) * SIZE_PER_SQUARE
);
encoder.createReadStream().pipe(fs.createWriteStream(OUTPUT_FILE_PATH));
encoder.start();
encoder.setDelay(1000);

function createFrame() {
  const uniqCoords = coords
    .map(coordToStr)
    .filter(uniqFilter)
    .map((s) => s.split(",").map((v) => parseInt(v, 10)));

  const canvas = createCanvas(
    (maxX + 3) * SIZE_PER_SQUARE,
    (maxY + 3) * SIZE_PER_SQUARE
  );
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = `black`;
  ctx.fillRect(
    0,
    0,
    (maxX + 1) * SIZE_PER_SQUARE,
    (maxY + 1) * SIZE_PER_SQUARE
  );
  for (let y = -1; y <= maxY + 1; y++) {
    for (let x = -1; x <= maxX + 1; x++) {
      const c = uniqCoords.find((c) => c[0] === x && c[1] === y);
      if (c) {
        ctx.fillStyle = "white";
        ctx.fillRect(
          x * SIZE_PER_SQUARE,
          y * SIZE_PER_SQUARE,
          SIZE_PER_SQUARE,
          SIZE_PER_SQUARE
        );
      }

      ctx.fillStyle = "black";
    }
  }

  console.info("adding frame");
  encoder.addFrame(ctx);
}

console.info("Creating frame", 0);
createFrame();
for (let f = 0; f < folds.length; f++) {
  console.info("Performing fold", f);
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
  console.info("Creating frame", f + 1);
  createFrame();
}

encoder.finish();

console.timeEnd("Run time");
