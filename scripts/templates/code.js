console.time("Total run time");

console.time("Init run time");
const assert = require("assert");
const parse = require("./parse");

const TEST_FILES = ["sample"];
const TEST_ANSWERS = {
  sample: 0,
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

function run(key, data) {
  console.info(`Running with '${key}' dataset`);
  // Add code here
  return 0;
}

console.time("Sample test run time time");
TEST_FILES.forEach((key) => {
  const result = run(key, TEST_DATA_SETS[key]);
  assert.equal(result, TEST_ANSWERS[key]);
});
console.timeEnd("Sample test run time time");

console.time("Answer run time");
const result = run("input", INPUT_DATA_SET);
console.info("ANSWER:", result);
console.timeEnd("Answer run time");

console.timeEnd("Total run time");
