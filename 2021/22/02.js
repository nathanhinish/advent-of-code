console.time("Run time");

const assert = require("assert");
let answer;

const inputFile = process.argv[2];

const TEST_AGAINST_PART_1 = false;

const EXPECTED_OUTPUT = ([
  ["sample1", 39],
  ["sample2", 590784],
  ["sample3", 2758514936282235],
  [TEST_AGAINST_PART_1 ? "input" : "somerandomthingthatwontgetchecked", 620241],
].find((entry) => inputFile.includes(entry[0])) || [])[1];

function shouldConstrainInput() {
  return [
    TEST_AGAINST_PART_1 ? "input" : "somerandomthingthatwontgetchecked",
    "sample1",
    "sample2",
  ].some((f) => inputFile.includes(f));
}

function key(region) {
  return region.join(",");
}

function fromKey(key) {
  return key.split(",").map(Number);
}

const volume = require("./volume");
const intersect = require("./intersect");
const isValidRegion = require("./isValidRegion");

let instructions = require("./parse")(inputFile);

// To run tests against data for part 1
if (shouldConstrainInput()) {
  instructions = instructions
    .map((instruction) => {
      return {
        ...instruction,
        region: intersect([-50, 50, -50, 50, -50, 50], instruction.region),
      };
    })
    .filter((i) => isValidRegion(i.region));
}

class RegionMap {
  constructor() {
    this._map = {};
  }

  updateValue(region, value) {
    if (typeof region !== "string") {
      region = key(region);
    }
    if (this._map[region] === undefined) {
      this._map[region] = 0;
    }
    this._map[region] += value;
  }

  clean() {
    Object.keys(this._map).forEach((key) => {
      if (this._map[key] === 0) {
        delete this._map[key];
      }
    });
  }

  getObject() {
    return Object.assign({}, this._map);
  }

  update(map) {
    if (map.getObject !== undefined) {
      map = map.getObject();
    }
    Object.keys(map).forEach((key) => {
      this.updateValue(key, map[key]);
    });
  }

  // (region, value) => {}
  each(fn) {
    Object.keys(this._map).forEach((key) => {
      fn(fromKey(key), this._map[key]);
    });
  }

  toString() {
    return this.getObject();
  }
}

const regions = new RegionMap();
for (let i = 0; i < instructions.length; i++) {
  const { operation, region } = instructions[i];

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

answer = volumes.reduce((sum, v) => sum + v, 0);

if (EXPECTED_OUTPUT != undefined) {
  assert.equal(answer, EXPECTED_OUTPUT);
}

console.info("Answer:", answer);
console.timeEnd("Run time");
