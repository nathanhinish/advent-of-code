console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

// FOR REFERENCE
const NUM_SEGMENTS_FOR_NUM = {
  0: 6,
  1: 2,
  2: 5,
  3: 5,
  4: 4,
  5: 5,
  6: 6,
  7: 3,
  8: 7,
  9: 6,
};

// Alphabetically sort the inputs & outputs
const lineInputs = lines.map((l) =>
  l
    .split(" | ")[0]
    .split(" ")
    .map((v) => v.split("").sort().join(""))
);
const lineOutputs = lines.map((l) =>
  l
    .split(" | ")[1]
    .split(" ")
    .map((v) => v.split("").sort().join(""))
);

function setContainsOtherSet(unknownDigit, knownDigit) {
  return (
    knownDigit
      .split("")
      .map((c) => unknownDigit.includes(c))
      .filter((v) => !v).length === 0
  );
}

let sum = 0;

for (let i = 0; i < lineOutputs.length; i++) {
  let input = lineInputs[i];
  const output = lineOutputs[i];

  const digits = [];

  function isThree(value) {
    if (value.length !== 5) {
      return false;
    }

    if (!digits[7]) {
      throw new Error("Value of seven is required to determine three");
    }

    if (!digits[4]) {
      throw new Error("Value of four is required to determine three");
    }

    return (
      setContainsOtherSet(value, digits[7]) &&
      !setContainsOtherSet(value, digits[4])
    );
  }

  function isNine(value) {
    if (value.length !== 6) {
      return false;
    }

    if (!digits[7]) {
      throw new Error("Value of three is required to determine nine");
    }

    return setContainsOtherSet(value, digits[3]);
  }

  function isZero(value) {
    if (value.length !== 6) {
      return false;
    }

    if (!digits[1]) {
      throw new Error("Value of one is required to determine zero");
    }

    return setContainsOtherSet(value, digits[1]);
  }

  function isFive(value) {
    if (value.length !== 5) {
      return false;
    }

    if (!digits[6]) {
      throw new Error("Value of six is required to determine five");
    }

    return setContainsOtherSet(digits[6], value);
  }

  digits[1] = input.find((v) => v.length === 2);
  input = input.filter((v) => v !== digits[1]);

  digits[4] = input.find((v) => v.length === 4);
  input = input.filter((v) => v !== digits[4]);

  digits[7] = input.find((v) => v.length === 3);
  input = input.filter((v) => v !== digits[7]);

  digits[8] = input.find((v) => v.length === 7);
  input = input.filter((v) => v !== digits[8]);

  digits[3] = input.find(isThree);
  input = input.filter((v) => v !== digits[3]);

  digits[9] = input.find(isNine);
  input = input.filter((v) => v !== digits[9]);

  digits[0] = input.find(isZero);
  input = input.filter((v) => v !== digits[0]);

  digits[6] = input.find((v) => v.length === 6);
  input = input.filter((v) => v !== digits[6]);

  digits[5] = input.find(isFive);
  input = input.filter((v) => v !== digits[5]);

  digits[2] = input[0];

  sum =
    sum +
    output.reduce(
      (acc, v, i) => acc + digits.indexOf(v) * Math.pow(10, 3 - i),
      0
    );
}

answer = sum;

console.info("Answer:", answer);
console.timeEnd("Run time");
