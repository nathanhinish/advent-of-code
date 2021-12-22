console.time("Run time");

let answer;

const inputFile = process.argv[2];

const INSTR_RE =
  /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;

const INSTRUCTIONS = require("../common/getLinesOfFile")(inputFile)
  .filter((l) => !!l)
  .map((line) => {
    const match = INSTR_RE.exec(line);
    const coords = Array.from(match).slice(2).map(Number);
    if (
      coords[0] > 50 ||
      coords[1] < -50 ||
      coords[2] > 50 ||
      coords[3] < -50 ||
      coords[4] > 50 ||
      coords[5] < -50
    ) {
      return null;
    }
    return {
      setValueTo: match[1] === "on" ? 1 : 0,
      xRange: [Math.max(-50, coords[0]) + 50, Math.min(50, coords[1]) + 50],
      yRange: [Math.max(-50, coords[2]) + 50, Math.min(50, coords[3]) + 50],
      zRange: [Math.max(-50, coords[4]) + 50, Math.min(50, coords[5]) + 50],
    };
  })
  .filter((instr) => !!instr);

console.info("# Valid instructions found:", INSTRUCTIONS.length);

let numToggles = 0;
const reactorState = Array(101)
  .fill(0)
  .map(() =>
    Array(101)
      .fill(0)
      .map(() => Array(101).fill(0))
  );
INSTRUCTIONS.forEach((instr) => {
  const { setValueTo, xRange, yRange, zRange } = instr;

  // console.info(instr);
  for (let z = zRange[0]; z <= zRange[1]; z++) {
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      for (let x = xRange[0]; x <= xRange[1]; x++) {
        // console.info(z, y, x, setValueTo, reactorState[z][y].join(""));

        if (reactorState[z][y][x] !== setValueTo) {
          numToggles++;
          reactorState[z][y][x] = setValueTo;
        }
      }
    }
  }
});
console.info("# toggles:", numToggles);

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

console.info("Answer:", answer);
console.timeEnd("Run time");
