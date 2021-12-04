console.time("Run time");
process.chdir(__dirname);
let answer;

const getLinesOfFile = require("../common/getLinesOfFile");
const lines = getLinesOfFile("./input");

const numbers = lines[0].split(",").map((e) => parseInt(e, 10));

const WINNING_COMBOS = require("./WinningCombos");
const boards = [];
const matches = [];

function checkBoard(match, board, num) {
  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    const c = WINNING_COMBOS[i];
    const sum = c.reduce((acc, idx) => match[idx] + acc, 0);
    if (sum === 5) {
      const unmarked = board.reduce((acc, v, i) => {
        if (match[i] === 1) {
          return acc;
        }

        return acc + v;
      }, 0);

      return {
        row: c.map((idx) => board[idx]),
        unmarked,
        num,
      };
    }
  }

  return false;
}

let nonWinners = boards.length;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim() === "") {
    boards.push([]);
    matches.push([]);
  } else {
    const board = boards[boards.length - 1];
    const matchBoard = matches[matches.length - 1];

    const row = line
      .trim()
      .split(/\s+/)
      .map((e) => parseInt(e, 10));
    board.push(...row);
    matchBoard.push(...row.map(() => 0));
  }
}

let winner;
let finalWinner;
for (let i = 0; i < numbers.length; i++) {
  const num = numbers[i];
  for (let j = 0; j < boards.length; j++) {
    const board = boards[j];
    let matchBoard = matches[j];

    matchBoard = matchBoard.map((v, n) => {
      if (v === 1) {
        return v;
      }
      return board[n] === num ? 1 : 0;
    });
    matches[j] = matchBoard;

    winner = checkBoard(matchBoard, board, num);
    if (winner) {
      if (boards.length <= 1) {
        finalWinner = winner;
      }
      boards.splice(j, 1);
      matches.splice(j, 1);
      j = j - 1;
    }
  }
}

console.info(finalWinner);
if (finalWinner) {
  answer = finalWinner.unmarked * finalWinner.num;
}

console.info("Answer:", answer);
console.timeEnd("Run time");
