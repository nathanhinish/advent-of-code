console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

const CHARS = ["(", ")", "[", "]", "{", "}", "<", ">"];

const COORES_CLOSING = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const ERROR_VAL = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

console.info("(".charCodeAt(0));

const OPENING_CHARS = ["(", "[", "{", "<"];
const CLOSING_CHARS = [")", "]", "}", ">"];

let errorSum = 0;
for (let i = 0; i < lines.length; i++) {
  // const i = 0;
  const chars = lines[i].split("");
  const nextClosing = [];
  const failed = chars.find((c, idx, arr) => {
    if (OPENING_CHARS.includes(c)) {
      // console.info("found opening", c);
      nextClosing.unshift(COORES_CLOSING[c]);
    } else if (CLOSING_CHARS.includes(c)) {
      // console.info("found closing", c);
      // console.info("expecting", nextClosing[0]);
      const expected = nextClosing.shift();
      // console.info("result", expected !== c);
      return expected !== c;
    }
  });

  console.info(i, "->", failed, ERROR_VAL[failed]);
  if (failed) {
    errorSum += ERROR_VAL[failed] || 0;
  }
}

answer = errorSum;

console.info("Answer:", answer);
console.timeEnd("Run time");
