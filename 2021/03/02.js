console.time("Run time");
process.chdir(__dirname);
let answer;

const getLinesOfFile = require("../common/getLinesOfFile");
const lineLen = 12;
const lines = getLinesOfFile("./input").sort().reverse();

let o2lines = [...lines];
for (let i = 0; i < lineLen; i++) {
  const firstOne = o2lines
    .map((l) => l[i])
    .sort()
    .indexOf("1");

  const o2Char = firstOne <= o2lines.length / 2 ? "1" : "0";

  o2lines = o2lines.filter((l) => l[i] === o2Char);
  if (o2lines.length <= 1) {
    break;
  }
}

let co2lines = [...lines];
for (let i = 0; i < lineLen; i++) {
  const firstOne = co2lines
    .map((l) => l[i])
    .sort()
    .indexOf("1");

  const co2Char = firstOne <= co2lines.length / 2 ? "0" : "1";

  co2lines = co2lines.filter((l) => l[i] === co2Char);
  if (co2lines.length <= 1) {
    break;
  }
}

const o2 = parseInt(o2lines[0], 2);
const co2 = parseInt(co2lines[0], 2);

console.info("O2 ", o2lines, o2);
console.info("CO2", co2lines, co2);
console.info("");

answer = o2 * co2;

console.info("Answer:", answer);
console.timeEnd("Run time");
