const assert = require("assert");
const { HALLWAY_SPOTS, ROOM_SPOTS, NUM_ROOMS } = require("./constants");
const HALLWAY_COSTS = require("./HallwayCosts.json");

const energyCache = {};

function moveToKey(values) {
  return values.join(",");
}
function historyToKey(history) {
  return history.map(moveToKey).join(", ");
}

function calculateMoveEnergy(move) {
  const key = moveToKey(move);

  if (energyCache[key] !== undefined) {
    return energyCache[key];
  }

  let [srcListIndex, srcIndex, destListIndex, destIndex, value] = move;

  if ((destListIndex, 0 && value !== destListIndex)) {
    throw new Error(
      `Invalid move. Pod of ${value} can not enter room ${destListIndex}`
    );
  }
  if (srcListIndex === 0 && destListIndex === 0) {
    throw new Error(
      `Invalid move. Pod can not move from one hallway position to another`
    );
  }

  const multiplier = Math.pow(10, value - 1);
  let totalSpaces = 0;

  if (srcListIndex !== 0 && destListIndex !== 0) {
    // moving room to room
    totalSpaces =
      srcIndex + destIndex + (Math.abs(srcListIndex - destListIndex) + 1) * 2;
  } else if (srcListIndex !== 0 || destListIndex !== 0) {
    // moving hallway to room or room to hallway (swap in the latter case)

    if (srcListIndex !== 0) {
      // swap start and end
      [srcListIndex, srcIndex, destListIndex, destIndex] = [
        destListIndex,
        destIndex,
        srcListIndex,
        srcIndex,
      ];
    }

    const hallwayEndIndex = destListIndex + (srcIndex > destListIndex ? 1 : 0);
    const hallwayCost = HALLWAY_COSTS[srcIndex][hallwayEndIndex];
    const roomCost = destIndex + 1 + 1; // +1 for "doorway" space
    totalSpaces = hallwayCost + roomCost;
  } else {
    throw new Error(`Invalid move. Unknown config: ${key}`);
  }
  return (energyCache[key] = totalSpaces * multiplier);
}

console.info("Prefilling energy cost cache");
for (let v = 1; v <= 4; v++) {
  for (let si = 1; si <= NUM_ROOMS; si++) {
    for (let depth = 0; depth < ROOM_SPOTS; depth++) {
      // room to hallway & hallway to room
      for (let di = 0; di < HALLWAY_SPOTS; di++) {
        calculateMoveEnergy([si, depth, 0, di, v]);
        calculateMoveEnergy([0, di, si, depth, v]);
      }
      // room to room
      for (let di = 1; di <= NUM_ROOMS; di++) {
        for (let depth2 = 0; depth2 <= ROOM_SPOTS; depth2++) {
          calculateMoveEnergy([si, depth, di, depth2, v]);
          calculateMoveEnergy([di, depth2, si, depth, v]);
        }
      }
    }
  }
}
console.info("Energy cost cache size", Object.keys(energyCache).length);
[
  [[1, 3, 0, 0, 2], 60],
  [[1, 3, 0, 1, 2], 50],
  [[1, 3, 0, 2, 2], 50],
  [[1, 3, 0, 6, 2], 120],
  [[1, 3, 0, 6, 4], 12000],
  [[1, 3, 3, 3, 3], 1200],
  [[3, 3, 1, 3, 1], 12],
  [[0, 6, 1, 3, 1], 12],

  [[1, 0, 0, 0, 4], 3000],
  [[1, 1, 0, 1, 2], 30],
  [[2, 0, 0, 3, 3], 200],
  [[2, 1, 1, 1, 1], 6],
  [[0, 1, 2, 1, 2], 50],
  [[3, 0, 0, 4, 4], 2000],
  [[4, 0, 0, 6, 2], 30],
  [[4, 1, 0, 5, 3], 300],
  [[0, 4, 4, 1, 4], 3000],
  [[3, 1, 0, 4, 1], 3],
  [[0, 3, 3, 1, 3], 300],
  [[0, 4, 1, 0, 1], 6],
  [[0, 0, 4, 0, 4], 9000],
  [[0, 5, 3, 0, 3], 400],
  [[0, 6, 2, 0, 2], 70],
].forEach((entry) => {
  assert.equal(calculateMoveEnergy(entry[0]), entry[1]);
  assert.equal(energyCache[moveToKey(entry[0])], entry[1]);
});

function getEnergyForMoves(history) {
  const key = historyToKey(history);
  if (energyCache[key] !== undefined) {
    return energyCache[key];
  }
  let totalEnergyUsed = 0;
  history.forEach((move) => (totalEnergyUsed += calculateMoveEnergy(move)));
  return (energyCache[key] = totalEnergyUsed);
}

assert.equal(
  getEnergyForMoves([
    [1, 0, 0, 0, 4],
    [1, 1, 0, 1, 2],
    [2, 0, 0, 3, 3],
    [2, 1, 1, 1, 1],
    [0, 1, 2, 1, 2],
    [3, 0, 0, 4, 4],
    [4, 0, 0, 6, 2],
    [4, 1, 0, 5, 3],
    [0, 4, 4, 1, 4],
    [3, 1, 0, 4, 1],
    [0, 3, 3, 1, 3],
    [0, 4, 1, 0, 1],
    [0, 0, 4, 0, 4],
    [0, 5, 3, 0, 3],
    [0, 6, 2, 0, 2],
  ]),
  18395
);

module.exports = {
  calculateMoveEnergy,
  getEnergyForMoves,
  historyToKey,
  moveToKey,
};
