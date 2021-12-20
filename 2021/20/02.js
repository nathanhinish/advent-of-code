console.time("Run time");

let answer;

const inputFile = process.argv[2];

const [enhAlgo, imgPxls] = require("fs")
  .readFileSync(inputFile, "utf8")
  .split("\n\n")
  .map((v, i) => {
    if (i === 0) {
      return v.split("\n").join("");
    }
    return v;
  });

function createBlankLine(len, char) {
  return Array(len).fill(char).join("") + "\n";
}

function prepareImage(pixels, addChar) {
  const padding = 2;

  const newLines = pixels
    .split("\n")
    .filter((l) => !!l)
    .map((l) => {
      for (let i = 0; i < padding; i++) {
        l = addChar + l + addChar;
      }
      return l;
    });
  const lineLength = Math.max(...newLines.map((l) => l.length));

  pixels = newLines.join("\n") + "\n";

  for (let i = 0; i < padding; i++) {
    pixels =
      createBlankLine(lineLength, addChar) +
      pixels +
      createBlankLine(lineLength, addChar);
  }

  return pixels.trim();
}

const valueToCheck = [0, 6, 8];

let defaultValue = ".";
let imageData = imgPxls;

function getNewPixelValue(values) {
  const binStr = values.map((c) => (c === "#" ? "1" : "0")).join("");
  const index = parseInt(binStr, 2);
  return enhAlgo[index];
}

for (let n = 0; n < 50; n++) {
  imageData = prepareImage(imageData, defaultValue);

  // console.info(imageData);

  const lines = imageData.split("\n");
  const newImgData = [];
  for (let y = 0; y < lines.length; y++) {
    const maxLineLength = Math.max(...lines.map((v) => v.length));
    newImgData.push([]);
    for (let x = 0; x < maxLineLength; x++) {
      const values = [
        // Line Above
        y === 0 || x === 0 ? defaultValue : lines[y - 1][x - 1],
        y === 0 ? defaultValue : lines[y - 1][x],
        y === 0 || x === lines.length - 1 ? defaultValue : lines[y - 1][x + 1],

        // Current line
        x === 0 ? defaultValue : lines[y][x - 1],
        lines[y][x],
        x === lines.length - 1 ? defaultValue : lines[y][x + 1],

        // Line Below
        y === lines.length - 1 || x === 0 ? defaultValue : lines[y + 1][x - 1],
        y === lines.length - 1 ? defaultValue : lines[y + 1][x],
        y === lines.length - 1 || x === lines.length - 1
          ? defaultValue
          : lines[y + 1][x + 1],
      ];

      newImgData[y][x] = getNewPixelValue(values);
    }
  }

  imageData = newImgData.map((l) => l.join("")).join("\n");

  // console.info(imageData);

  defaultValue = getNewPixelValue(Array(9).fill(defaultValue));
}

answer = imageData.split("").filter((c) => c === "#").length;

console.info("Answer:", answer);
console.timeEnd("Run time");
