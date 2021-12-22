console.time("Run time");

let answer;

const inputFile = process.argv[2];

const EXPECTED_OUTPUT = ([
  ["sample1", 39],
  ["sample2", 590784],
].find((entry) => inputFile.includes(entry[0])) || [])[1];

const assert = require("assert");
const intersect = require("./intersect");
const isValidRegion = require("./isValidRegion");
const instructions = require("./parse")(inputFile)
  .map((instruction) => {
    return {
      ...instruction,
      region: intersect([-50, 50, -50, 50, -50, 50], instruction.region),
    };
  })
  .filter((i) => isValidRegion(i.region));

const reactorState = Array(101)
  .fill(0)
  .map(() =>
    Array(101)
      .fill(0)
      .map(() => Array(101).fill(0))
  );

instructions.forEach((instr) => {
  const { operation, region } = instr;

  for (let x = region[0] + 50; x <= region[1] + 50; x++) {
    for (let y = region[2] + 50; y <= region[3] + 50; y++) {
      for (let z = region[4] + 50; z <= region[5] + 50; z++) {
        reactorState[x][y][z] = operation === "on" ? 1 : 0;
      }
    }
  }
});
let numTurnedOn = 0;
for (let z = 0; z < reactorState.length; z++) {
  for (let y = 0; y < reactorState[z].length; y++) {
    for (let x = 0; x < reactorState[z][y].length; x++) {
      if (reactorState[z][y][x] === 1) {
        numTurnedOn++;
      }
    }
  }
}

answer = numTurnedOn;

if (EXPECTED_OUTPUT != undefined) {
  assert.equal(answer, EXPECTED_OUTPUT);
}

console.info("Answer:", answer);
console.timeEnd("Run time");
