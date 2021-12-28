console.time("Total run time");
console.time("Init run time");

const assert = require("assert");
const parse = require("./parse");
const run = require("./run");

const TEST_FILES = ["sample"];
const TEST_ANSWERS = {
  sample: 58,
};
const TEST_DATA_SETS = TEST_FILES.reduce(
  (o, f) => ({
    ...o,
    [f]: parse(f),
  }),
  {}
);
const INPUT_DATA_SET = parse("input");

console.timeEnd("Init run time");
console.info("");
console.time("Test run time");
TEST_FILES.forEach((key) => {
  console.info(`Testing with '${key}' dataset`);
  const result = run(TEST_DATA_SETS[key]);
  assert.equal(result, TEST_ANSWERS[key]);
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
