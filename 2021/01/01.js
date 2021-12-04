const getLinesOfFile = require("../common/getLinesOfFile");
const reducer_numGreaterThanLast = require("../common/reducer_numGreaterThanLast");

const readings = getLinesOfFile("./input").map((l) => parseInt(l, 10));
const numBiggerThanLast = readings.reduce(reducer_numGreaterThanLast, 0);

console.info(numBiggerThanLast);
