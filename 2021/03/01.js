const getLinesOfFile = require("../common/getLinesOfFile");
const lineLen = 12;

const gammas = [];
const epses = [];

const lines = getLinesOfFile("./input");
const numLines = lines.length;

for (var i = 0; i < lineLen; i++) {
  const firstOne = lines
    .map((l) => l.charAt(i))
    .sort()
    .indexOf("1");

  gammas.push(firstOne <= 500 ? 1 : 0);
  epses.push(firstOne > 500 ? 1 : 0);
}
const g = parseInt(gammas.join(""), 2);
const e = parseInt(epses.join(""), 2);
console.info("GAMMA", g, gammas.join(""));
console.info("EPS  ", e, epses.join(""));
console.info("PROD ", g * e);