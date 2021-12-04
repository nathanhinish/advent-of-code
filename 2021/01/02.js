console.time("Run time");
process.chdir(__dirname);

const getLinesOfFile = require("../common/getLinesOfFile");
const generator_reducer_readingSums = require("../common/generator_reducer_readingSums");
const reducer_numGreaterThanLast = require("../common/reducer_numGreaterThanLast");

const readings = getLinesOfFile("./input").map((l) => parseInt(l, 10));

const sumReducer = generator_reducer_readingSums(3);
const sums = readings.reduce(sumReducer, []);

const numBiggerThanLast = sums.reduce(reducer_numGreaterThanLast, 0);

console.info(numBiggerThanLast);

console.timeEnd("Run time");
