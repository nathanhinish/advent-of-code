console.time("Run time");

let answer;

const STARTING_POSITIONS = [8, 6];

const POINTS_TO_WIN = 1000;

let p1Stats = [STARTING_POSITIONS[0], 0];
let p2Stats = [STARTING_POSITIONS[1], 0];

let lastRoll = 0;
let totalRolls = 0;
const roll = () => {
  totalRolls++;
  return ++lastRoll;
};

let isP1Turn = true;

while (p1Stats[1] < POINTS_TO_WIN && p2Stats[1] < POINTS_TO_WIN) {
  const rolls = [roll(), roll(), roll()];
  const totalRoll = rolls.reduce((a, v) => a + v, 0);
  const currPlayer = isP1Turn ? p1Stats : p2Stats;
  currPlayer[0] = currPlayer[0] + totalRoll;
  while (currPlayer[0] > 10) {
    currPlayer[0] = currPlayer[0] - 10;
  }
  currPlayer[1] = currPlayer[1] + currPlayer[0];

  isP1Turn = !isP1Turn;
}

answer = Math.min(p1Stats[1], p2Stats[1]) * totalRolls;

console.info("Answer:", answer);
console.timeEnd("Run time");
