console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

const lineOutputs = lines.map((l) => l.split(" | ")[1].split(" "));

const allSingleOutputs = lineOutputs
  .reduce((acc, v) => {
    acc.push(...v);
    return acc;
  }, [])
  .map((v) => v.length);
let num1 = allSingleOutputs.filter((v) => v === 2).length;
let num4 = allSingleOutputs.filter((v) => v === 4).length;
let num7 = allSingleOutputs.filter((v) => v === 3).length;
let num8 = allSingleOutputs.filter((v) => v === 7).length;

// Add code here
answer = num1 + num4 + num7 + num8;
console.info("Answer:", answer);
console.timeEnd("Run time");
