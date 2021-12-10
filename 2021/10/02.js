console.time("Run time");
process.chdir(__dirname);
const getSyntaxError = require("./getSyntaxError");
const getComplScore = require("./getComplScore");
const { OPENING_CHARS, CLOSING_CHARS, COORES_CLOSING } = require("./constants");
const lines = require("../common/getLinesOfFile")("./input");

const nonErrorLines = lines.filter((l) => !getSyntaxError(l));

const completionScores = nonErrorLines
  .map((line, i) => {
    const chars = line.split("");
    const nextClosing = [];
    chars.forEach((c) => {
      if (OPENING_CHARS.includes(c)) {
        nextClosing.unshift(COORES_CLOSING[c]);
      } else if (CLOSING_CHARS.includes(c)) {
        nextClosing.shift();
      }
    });

    const testLine = line + nextClosing.join("");
    const testFailure = getSyntaxError(testLine);
    if (testFailure) {
      throw new Error("Unexpected syntax error");
    }

    return getComplScore(nextClosing);
  })
  .sort((a, b) => a - b);

const middleIndex = Math.floor(completionScores.length / 2);
const answer = completionScores[middleIndex];

console.info("Answer:", answer);
console.timeEnd("Run time");
