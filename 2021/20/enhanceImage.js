const getNewPixelValue = require("./getNewPixelValue");

const createBlankLine = (len, char) => Array(len).fill(char).join("") + "\n";

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

module.exports = function enhanceImage(imageData, algorithm, defaultValue) {
  imageData = prepareImage(imageData, defaultValue);

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

      newImgData[y][x] = getNewPixelValue(values, algorithm);
    }
  }

  return newImgData.map((l) => l.join("")).join("\n");
};
