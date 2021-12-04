console.time("Run time");
process.chdir(__dirname);
let answer;

const getLinesOfFile = require("../common/getLinesOfFile");
const generator_reducer_readingSums = require("../common/generator_reducer_readingSums");
const reducer_numGreaterThanLast = require("../common/reducer_numGreaterThanLast");

const readings = getLinesOfFile("./input").map((l) => parseInt(l, 10));

const sumReducer = generator_reducer_readingSums(3);
const sums = readings.reduce(sumReducer, []);

answer = sums.reduce(reducer_numGreaterThanLast, 0);

console.info("Answer:", answer);
console.timeEnd("Run time");
