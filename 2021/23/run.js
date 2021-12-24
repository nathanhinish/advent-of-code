const getValidMoves = require("./getValidMoves");
const { HALLWAY_SPOTS, ROOM_SPOTS } = require("./constants");
const {
  calculateMoveEnergy,
  getEnergyForMoves,
  historyToKey,
} = require("./getEnergyForMoves");

// { [stateKey]: value }
const energyForRemaining = {};

const WINNING_KEY = [
  ...Array(HALLWAY_SPOTS).fill(0),
  ...Array(ROOM_SPOTS).fill(1),
  ...Array(ROOM_SPOTS).fill(2),
  ...Array(ROOM_SPOTS).fill(3),
  ...Array(ROOM_SPOTS).fill(4),
].join(",");

function toKey(state) {
  return state.flat().join(",");
}

function applyMoveToState(state, move) {
  const newState = state.map((list) => [...list]);
  newState[move[2]][move[3]] = state[move[0]][move[1]];
  newState[move[0]][move[1]] = 0;
  return newState;
}

function makeMove(state, moveHistory, stats) {
  const key = toKey(state);

  const historyEnergy = getEnergyForMoves(moveHistory);
  if (energyForRemaining[key] !== undefined) {
    return energyForRemaining[key] + historyEnergy;
  }

  if (historyEnergy >= stats.optimalEnergyCost) {
    return Number.POSITIVE_INFINITY;
  }

  if (key === WINNING_KEY) {
    return historyEnergy;
  }

  const validMoves = [...getValidMoves(state)].sort((a, b) => {
    const costA = calculateMoveEnergy(a);
    const costB = calculateMoveEnergy(b);
    if (costA !== costB) {
      return costA - costB;
    }
  });

  let lowestTotalEnergyUsed = Number.POSITIVE_INFINITY;
  for (let i = 0; i < validMoves.length; i++) {
    const move = validMoves[i];
    const totalEnergyUsed = makeMove(
      applyMoveToState(state, move),
      [...moveHistory, move],
      stats
    );
    if (isFinite(totalEnergyUsed) && totalEnergyUsed < lowestTotalEnergyUsed) {
      lowestTotalEnergyUsed = totalEnergyUsed;
    }
  }
  if (isFinite(lowestTotalEnergyUsed)) {
    energyForRemaining[key] = lowestTotalEnergyUsed - historyEnergy;
  }

  if (lowestTotalEnergyUsed < stats.optimalEnergyCost) {
    const historyKey = historyToKey(moveHistory);
    stats.optimalStrategy = historyKey;
    stats.optimalEnergyCost = lowestTotalEnergyUsed;
    console.info("New lowest:", lowestTotalEnergyUsed);
  }

  return lowestTotalEnergyUsed;
}

module.exports = function run(data) {
  startTime = Date.now();
  const moveHistory = [];
  const stats = {
    optimalEnergyCost: Number.POSITIVE_INFINITY,
    optimalStrategy: null,
  };
  const lowestEnergyCost = makeMove(data, moveHistory, stats);

  return lowestEnergyCost;
};
