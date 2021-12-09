console.time("Run time");
const { createCanvas } = require("canvas");
process.chdir(__dirname);
let answer;

const SIZE_PER_SQUARE = 40;
const ELEV_FONT_HEIGHT = 14;
const COORD_FONT_HEIGHT = 9;
const ELEV_TEXT_PADDING = 2;
const COORD_TEXT_PADDING = 2;
const COORD_PRINT_INTERVAL = 10;

const BIGGEST = [
  [81, 65],
  [5, 5],
  [78, 19],
];

const lines = require("../common/getLinesOfFile")("./input");
const digits = lines.map((l) => l.split("").map((c) => parseInt(c, 10)));
// Add code here

const canvas = createCanvas(
  digits[0].length * SIZE_PER_SQUARE,
  digits.length * SIZE_PER_SQUARE
);
const ctx = canvas.getContext("2d");
ctx.font = `${ELEV_FONT_HEIGHT}px sans`;

for (let y = 0; y < digits.length; y++) {
  const len = digits[y].length;
  for (let x = 0; x < len; x++) {
    const val = digits[y][x];
    const hexVal = Math.round((val * 200) / 9) + 55;
    ctx.fillStyle = `rgb(${hexVal},${hexVal},${hexVal})`;
    ctx.fillRect(
      x * SIZE_PER_SQUARE,
      y * SIZE_PER_SQUARE,
      (x + 1) * SIZE_PER_SQUARE,
      (y + 1) * SIZE_PER_SQUARE
    );

    if (BIGGEST.find((c) => c[0] === x && c[1] === y)) {
      ctx.fillStyle = `red`;
      ctx.fillRect(
        x * SIZE_PER_SQUARE,
        y * SIZE_PER_SQUARE,
        (x + 1) * SIZE_PER_SQUARE,
        (y + 1) * SIZE_PER_SQUARE
      );
    }

    ctx.fillStyle = val < 5 ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
    if (x % COORD_PRINT_INTERVAL === 0 && y % COORD_PRINT_INTERVAL === 0) {
      ctx.font = `${COORD_FONT_HEIGHT}px sans`;
      ctx.fillText(
        `(${x}, ${y})`,
        x * SIZE_PER_SQUARE + COORD_TEXT_PADDING,
        y * SIZE_PER_SQUARE + COORD_FONT_HEIGHT + COORD_TEXT_PADDING
      );
    }
    ctx.font = `${ELEV_FONT_HEIGHT}px sans`;
    ctx.fillText(
      `${val}`,
      x * SIZE_PER_SQUARE + ELEV_TEXT_PADDING,
      (y + 1) * SIZE_PER_SQUARE - ELEV_TEXT_PADDING
    );
  }
}

const buff = canvas.toBuffer("image/png");

require("fs").writeFileSync("elevation.png", buff);

console.info("Answer:", answer);
console.timeEnd("Run time");
