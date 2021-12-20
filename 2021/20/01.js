console.time("Run time");

const enhanceImage = require("./enhanceImage");
const getNewPixelValue = require("./getNewPixelValue");
const parseInput = require("./parseInput");

let answer;

const inputFile = process.argv[2];

const [enhAlgo, imgPxls] = parseInput(inputFile);

let defaultValue = ".";
let imageData = imgPxls;

for (let n = 0; n < 2; n++) {
  imageData = enhanceImage(imageData, enhAlgo, defaultValue);
  defaultValue = getNewPixelValue(Array(9).fill(defaultValue), enhAlgo);
}

answer = imageData.split("").filter((c) => c === "#").length;

console.info("Answer:", answer);
console.timeEnd("Run time");
