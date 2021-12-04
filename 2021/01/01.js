console.time("Run time");
process.chdir(__dirname);
let answer;

const getLinesOfFile = require("../common/getLinesOfFile");
const reducer_numGreaterThanLast = require("../common/reducer_numGreaterThanLast");

const readings = getLinesOfFile("./input").map((l) => parseInt(l, 10));

answer = readings.reduce(reducer_numGreaterThanLast, 0);

console.info("Answer:", answer);
console.timeEnd("Run time");
