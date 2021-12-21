console.time("Run time");

let answer;

let p1Stats = [8, 0];
let p2Stats = [6, 0];

let lastRoll = 0;
let totalRolls = 0;
const roll = () => {
  totalRolls++;
  return ++lastRoll;
};

let isP1Turn = true;

while (p1Stats[1] < 1000 && p2Stats[1] < 1000) {
  const rolls = [roll(), roll(), roll()];
  console.info(rolls);
  const totalRoll = rolls.reduce((a, v) => a + v, 0);
  const currPlayer = isP1Turn ? p1Stats : p2Stats;
  currPlayer[0] = currPlayer[0] + totalRoll;
  while (currPlayer[0] > 10) {
    currPlayer[0] = currPlayer[0] - 10;
  }
  currPlayer[1] = currPlayer[1] + currPlayer[0];
  console.info("Player", isP1Turn ? "1" : "2", currPlayer[1]);

  isP1Turn = !isP1Turn;
}

answer = Math.min(p1Stats[1], p2Stats[1]) * totalRolls;

console.info("Answer:", answer);
console.timeEnd("Run time");
