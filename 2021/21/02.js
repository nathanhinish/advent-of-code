console.time("Run time");

let answer;

const P1_STARTING_POS = 8;
const P2_STARTING_POS = 6;

const WINNING_SCORE = 21;

const COMBINATIONS = [];
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    for (let k = 1; k <= 3; k++) {
      COMBINATIONS.push(i + j + k);
    }
  }
}
const NUM_OCCURRENCES = COMBINATIONS.sort().reduce(
  (a, v) => ({ ...a, [v]: (a[v] ?? 0) + 1 }),
  {}
);

const POSITIION_OUTCOMES = {};
for (let i = 1; i <= 10; i++) {
  const outcomesForPosition = {};
  for (let j = 3; j <= 9; j++) {
    let key = i + j;
    while (key > 10) {
      key -= 10;
    }
    outcomesForPosition[j] = key;
  }
  POSITIION_OUTCOMES[i] = outcomesForPosition;
}

const allGameStates = [
  {
    [`${P1_STARTING_POS},0,${P2_STARTING_POS},0`]: 1,
  },
];

function keyStr2Num(str) {
  return str.split(",").map(Number);
}

function numGamesIncomplete(states) {
  const keys = Object.keys(states);
  return keys.filter((stateStr) => {
    const state = keyStr2Num(stateStr);
    return state[1] < WINNING_SCORE && state[3] < WINNING_SCORE;
  }).length;
}

function performTurn(pos, score, roll) {
  const newPos = POSITIION_OUTCOMES[pos][roll];
  return [newPos, score + newPos];
}

/**
 * 
 * @param {string} previousStateStr A string in the form "P1_POSITION,P1_SCORE,P2_POSITION,P2_SCORE"
 * @param {*} numUniverses The # of universes the previous state occurred in
 * @returns 
 */
function constructAllPossibleStates(previousStateStr, numUniverses) {
  const [p1Pos, p1Score, p2Pos, p2Score] = keyStr2Num(previousStateStr);

  // If the previous state was already a finished game, 
  // don't calculate new states.
  if (p1Score >= WINNING_SCORE || p2Score >= WINNING_SCORE) {
    return [];
  }
  const states = {};
  for (let i = 3; i <= 9; i++) {
    const [newP1Pos, newP1Score] = performTurn(p1Pos, p1Score, i);
    if (newP1Score >= WINNING_SCORE) {
      states[`${newP1Pos},${newP1Score},${p2Pos},${p2Score}`] =
        numUniverses * NUM_OCCURRENCES[i];
    } else {
      for (let j = 3; j <= 9; j++) {
        const [newP2Pos, newP2Score] = performTurn(p2Pos, p2Score, j);
        states[`${newP1Pos},${newP1Score},${newP2Pos},${newP2Score}`] =
          numUniverses * NUM_OCCURRENCES[i] * NUM_OCCURRENCES[j];
      }
    }
  }
  return states;
}

while (allGameStates.length <= 1 || numGamesIncomplete(allGameStates[0]) > 0) {
  const lastStates = allGameStates[0];
  const newGameStates = Object.keys(lastStates).reduce((acc, key) => {
    const nextStates = constructAllPossibleStates(key, lastStates[key]);
    for (let key in nextStates) {
      acc[key] = (acc[key] ?? 0) + nextStates[key];
    }
    return acc;
  }, {});
  allGameStates.unshift(newGameStates);
}

const wins = allGameStates.reduce(
  (acc, states) => {
    Object.keys(states).forEach((key) => {
      const state = keyStr2Num(key);
      if (state[1] >= WINNING_SCORE) {
        acc[0] = acc[0] + states[key];
      } else if (state[3] >= WINNING_SCORE) {
        acc[1] = acc[1] + states[key];
      }
    });
    return acc;
  },
  [0, 0]
);

answer = Math.max(...wins);
console.info("Answer:", answer);
console.timeEnd("Run time");
