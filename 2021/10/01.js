console.time("Run time");
process.chdir(__dirname);
const getSyntaxError = require("./getSyntaxError");
const getErrorScore = require("./getErrorScore");
const lines = require("../common/getLinesOfFile")("./input");

let errorSum = 0;
for (let i = 0; i < lines.length; i++) {
  const failed = getSyntaxError(lines[i]);

  if (failed) {
    errorSum += getErrorScore(failed);
  }
}

const answer = errorSum;

console.info("Answer:", answer);
console.timeEnd("Run time");
