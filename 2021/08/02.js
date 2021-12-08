console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

// Add code here

console.info("Answer:", answer);
console.timeEnd("Run time");
