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
for (let i = 0; i < numbers.length; i++) {
  if (!winner) {
    const num = numbers[i];
    for (let j = 0; j < boards.length; j++) {
      const board = boards[j];
      let matchBoard = matches[j];
      if (!winner) {
        matchBoard = matchBoard.map((v, n) => {
          if (v === 1) {
            return v;
          }
          return board[n] === num ? 1 : 0;
        });
        winner = checkBoard(matchBoard, board, num);
        if (winner) {
          console.info("board idx", j);
        }
      }
      matches[j] = matchBoard;
    }
  }
}

console.info(winner);
if (winner) {
  console.info(winner.unmarked * winner.num);
}
