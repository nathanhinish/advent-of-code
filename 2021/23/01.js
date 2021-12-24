console.time("Total run time");
console.time("Init run time");

const assert = require("assert");
const run = require("./run");

const TEST_DATA_SETS = {
  // one: [
  //   [0, 0, 0, 0, 0, 0, 1],
  //   [0, 1], // A
  //   [2, 2], // B
  //   [3, 3], // C
  //   [4, 4], // D
  // ],

  // two: [
  //   [0, 0, 0, 0, 0, 1, 1],
  //   [0, 0], // A
  //   [02, 2], // B
  //   [3, 3], // C
  //   [4, 4], // D
  // ],

  // three: [
  //   [0, 0, 0, 0, 0, 1, 1],
  //   [0, 2], // A
  //   [0, 2], // B
  //   [3, 3], // C
  //   [4, 4], // D
  // ],

  // win: [
  //   [0, 0, 2, 0, 0, 0, 0],
  //   [4, 2], // A
  //   [3, 1], // B
  //   [4, 1], // C
  //   [0, 3], // D
  // ],

  // fail: [
  //   [0, 0, 3, 4, 2, 1, 1],
  //   [0, 0], // A
  //   [0, 2], // B
  //   [0, 3], // C
  //   [0, 4], // D
  // ],
};
const INPUT_DATA_SET = [
  [0, 0, 0, 0, 0, 0, 0],
  [4, 2], // A
  [3, 1], // B
  [4, 1], // C
  [2, 3], // D
];

console.timeEnd("Init run time");
console.info("");
console.time("Test run time");
Object.keys(TEST_DATA_SETS).forEach((key) => {
  console.info(`Testing with '${key}' dataset`);
  const result = run(TEST_DATA_SETS[key]);
  // assert.equal(result, TEST_ANSWERS[key]);
});
console.timeEnd("Test run time");
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
