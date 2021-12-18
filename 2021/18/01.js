console.time("Run time");

const magnitude = require("./magnitude");
const sumAllLines = require("./sumAllLines");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile).filter((l) => !!l);

const sum = sumAllLines(lines);

answer = magnitude(sum);

console.info("Answer:", answer);
console.timeEnd("Run time");
