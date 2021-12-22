console.time("Total run time");

console.time("Init run time");
const assert = require("assert");
const parse = require("./parse");
const intersect = require("./intersect");
const isValidRegion = require("./isValidRegion");
const RegionMap = require("./RegionMap");
const volume = require("./volume");

const TEST_FILES = ["sample1", "sample2", "sample3", "input"];
const TEST_ANSWERS = {
  sample1: 39,
  sample2: 590784,
  sample3: 2758514936282235,
  input: 620241,
};
const TEST_DATA_SETS = TEST_FILES.reduce(
  (o, f) => ({
    ...o,
    [f]: parse(f, true),
  }),
  {}
);
const INPUT_DATA_SET = parse("input");

function run(key, data) {
  const regions = new RegionMap();
  for (let i = 0; i < data.length; i++) {
    const { operation, region } = data[i];

    const newRegions = new RegionMap();

    // For each existing region, find any intersecting
    // regions and create a new entry with the negative
    // value of the existing.
    // Ex. if an existing region has a value of 3,
    //     create a new entry with a value of -3
    regions.each((existingRegion, existingValue) => {
      const intersectingRegion = intersect(existingRegion, region);
      if (isValidRegion(intersectingRegion)) {
        newRegions.updateValue(intersectingRegion, -1 * existingValue);
      }
    });

    // Now that the intersecting areas have been reset,
    // we can add the new region as a single entity with
    // value of 1 if this is an "on" operation.
    if (operation === "on") {
      newRegions.updateValue(region, 1);
    }

    // For easier debugging (gets rid of zero values)
    // newRegions.clean();

    regions.update(newRegions);

    // Note: this actually does make the algo more performant!
    regions.clean();
  }

  const volumes = [];
  regions.each((region, value) => volumes.push(volume(region) * value));

  return volumes.reduce((sum, v) => sum + v, 0);
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
