console.time("Total run time");
console.time("Init run time");

const assert = require("assert");
const constants = require("./constants");
const run = require("./run");

constants.ROOM_SPOTS = 4;

const INPUT_DATA_SET = [
  [0, 0, 0, 0, 0, 0, 0],
  [4, 4, 4, 2], // A
  [3, 3, 2, 1], // B
  [4, 2, 1, 1], // C
  [2, 1, 3, 3], // D
];

console.timeEnd("Init run time");
console.info("");
console.time("Answer run time");
const result = run(INPUT_DATA_SET);
console.timeEnd("Answer run time");
console.info("");
console.timeEnd("Total run time");
console.info("");
((r) => {
  const s = `| ANSWER: ${result.toString()} |`;
  console.info(Array(s.length).fill("=").join(""));
  console.info(s);
  console.info(Array(s.length).fill("=").join(""));
  console.info("");
})(result);
