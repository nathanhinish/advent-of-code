console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

const states = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

function increaseAdj(set, y, x, hasFlashed) {
  if (y > 0) {
    const prevLine = set[y - 1];

    prevLine[x]++;
    if (x > 0) {
      prevLine[x - 1]++;
    }
    if (x < prevLine.length - 1) {
      prevLine[x + 1]++;
    }
  }

  const line = set[y];
  if (x > 0) {
    line[x - 1]++;
  }
  if (x < line.length - 1) {
    line[x + 1]++;
  }

  if (y < set.length - 1) {
    const nextLine = set[y + 1];
    nextLine[x]++;
    if (x > 0) {
      nextLine[x - 1]++;
    }
    if (x < nextLine.length - 1) {
      nextLine[x + 1]++;
    }
  }

  // Test adjacent

  if (y > 0) {
    testForFlash(set, y - 1, x, hasFlashed);
    if (x > 0) {
      testForFlash(set, y - 1, x - 1, hasFlashed);
    }
    if (x < set[y].length - 1) {
      testForFlash(set, y - 1, x + 1, hasFlashed);
    }
  }

  if (x > 0) {
    testForFlash(set, y, x - 1, hasFlashed);
  }
  if (x < set[y].length - 1) {
    testForFlash(set, y, x + 1, hasFlashed);
  }

  if (y < set.length - 1) {
    testForFlash(set, y + 1, x, hasFlashed);
    if (x > 0) {
      testForFlash(set, y + 1, x - 1, hasFlashed);
    }
    if (x < set[y].length - 1) {
      testForFlash(set, y + 1, x + 1, hasFlashed);
    }
  }
}

function testForFlash(set, y, x, hasFlashed) {
  const val = set[y][x];

  if (isNaN(val)) {
    throw new Error(`${x}, ${y} NaN`);
  }

  const coordStr = `${x},${y}`;
  if (val > 9 && !hasFlashed.includes(coordStr)) {
    hasFlashed.push(coordStr);
    increaseAdj(states, y, x, hasFlashed);
  }
}

let numFlashes = 0;
for (let i = 0; i < 100; i++) {
  let hasFlashed = [];

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      line[x] = line[x] + 1;
    }
  }

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      try {
        testForFlash(states, y, x, hasFlashed);
      } catch (err) {
        console.info("ERROR on iter", i);
        throw err;
      }
    }
  }

  numFlashes += hasFlashed.length;

  for (let y = 0; y < states.length; y++) {
    const line = states[y];
    for (let x = 0; x < line.length; x++) {
      const val = line[x];
      if (val > 9) {
        states[y][x] = 0;
      }
    }
  }

  if (i < 10) {
    // console.info("step", i + 1);
    // console.info(states.map((l) => l.join("")).join("\n"));
  }
}

answer = numFlashes;

console.info("Answer:", answer);
console.timeEnd("Run time");
