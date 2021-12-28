const assert = require("assert");

function printState(state) {
  return state.map((r) => r.join("")).join("\n");
}

function applyRound(formerState) {
  let somethingMoved = false;
  const numRows = formerState.length;
  const numColumns = formerState[0].length;

  function buildEmptyStateArray() {
    return Array(numRows)
      .fill(0)
      .map((r) => Array(numColumns).fill("."));
  }

  // East-facing phase
  const phase1State = buildEmptyStateArray();
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numColumns; x++) {
      const char = formerState[y][x];
      if (char === ">") {
        const toY = y;
        const toX = x + 1 >= numColumns ? 0 : x + 1;
        if (formerState[toY][toX] === ".") {
          phase1State[toY][toX] = ">";
          somethingMoved = true;
        } else {
          phase1State[y][x] = ">";
        }
      } else if (char === "v") {
        phase1State[y][x] = "v";
      }
    }
  }

  // South-facing phase
  const phase2State = buildEmptyStateArray();
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numColumns; x++) {
      const char = phase1State[y][x];
      if (char === ">") {
        phase2State[y][x] = ">";
      } else if (char === "v") {
        const toY = y + 1 >= numRows ? 0 : y + 1;
        const toX = x;
        if (phase1State[toY][toX] === ".") {
          phase2State[toY][toX] = "v";
          somethingMoved = true;
        } else {
          phase2State[y][x] = "v";
        }
      }
    }
  }

  return [phase2State, somethingMoved];
}

assert.equal(
  printState(
    applyRound(
      `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`
        .split("\n")
        .map((r) => r.split(""))
    )[0]
  ),
  `....>.>v.>
v.v>.>v.v.
>v>>..>v..
>>v>v>.>.v
.>v.v...v.
v>>.>vvv..
..v...>>..
vv...>>vv.
>.v.v..v.v`
);

module.exports = function run(data) {
  // Add code here
  let currentState = data.map((l) => [...l]);
  let currentRound = 0;
  let somethingMoved = true;

  while (somethingMoved) {
    currentRound++;

    [currentState, somethingMoved] = applyRound(currentState);
  }

  return currentRound;
};
