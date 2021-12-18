console.time("Run time");

const magnitude = require("./magnitude");
const sumAllLines = require("./sumAllLines");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile).filter((l) => !!l);

let biggest = 0;
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < lines.length; x++) {
    if (x === y) {
      continue;
    }
    const sum = sumAllLines([lines[y], lines[x]]);
    biggest = Math.max(biggest, magnitude(sum));
  }
}

answer = biggest;

console.info("Answer:", answer);
console.timeEnd("Run time");

console.time("Run time");
