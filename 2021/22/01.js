console.time("Total run time");

console.time("Init run time");
const assert = require("assert");
const parse = require("./parse");

const TEST_FILES = ["sample1", "sample2"];
const TEST_ANSWERS = {
  sample1: 39,
  sample2: 590784,
};
const TEST_DATA_SETS = TEST_FILES.reduce(
  (o, f) => ({
    ...o,
    [f]: parse(f),
  }),
  {}
);
const INPUT_DATA_SET = parse("input", true);

function run(key, data) {
  const reactorState = {};
  data.forEach((instr, i) => {
    const { operation, region } = instr;

    for (let x = region[0] + 50; x <= region[1] + 50; x++) {
      for (let y = region[2] + 50; y <= region[3] + 50; y++) {
        for (let z = region[4] + 50; z <= region[5] + 50; z++) {
          const key = `${x},${y},${z}`;
          if (operation === "on") {
            reactorState[key] = 1;
          } else {
            delete reactorState[key];
          }
        }
      }
    }
  });

  return Object.keys(reactorState).length;
}

console.timeEnd("Init run time");
console.info("");
console.time("Test run time");
TEST_FILES.forEach((key) => {
  console.info(`Testing with '${key}' dataset`);

  const result = run(key, TEST_DATA_SETS[key]);
  assert.equal(result, TEST_ANSWERS[key]);
});
console.timeEnd("Test run time");
console.info("");
console.time("Answer run time");
const result = run("input", INPUT_DATA_SET);
console.timeEnd("Answer run time");
console.info("");
console.timeEnd("Total run time");
console.info("");
((r) => {
  const s = `| ANSWER: ${result.toString()} |`;
  console.info(Array(s.length).fill("=").join(""));
  console.info(s);
  console.info(Array(s.length).fill("=").join(""));
})(result);
