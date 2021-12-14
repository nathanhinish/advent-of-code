console.time("Run time");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile);

const template = lines[0];
const { keysToSearchFor, valuesToReplaceWith } = lines.slice(2).reduce(
  ({ keysToSearchFor, valuesToReplaceWith }, l) => {
    const parts = l.split(" -> ");
    const pair = parts[0];
    const replacement = pair[0] + parts[1] + pair[1];

    return {
      keysToSearchFor: [...keysToSearchFor, pair],
      valuesToReplaceWith: [...valuesToReplaceWith, replacement],
    };
  },
  { keysToSearchFor: [], valuesToReplaceWith: [] }
);

const numSteps = 10;

let currentState = template;
for (let i = 0; i < numSteps; i++) {
  let pairs = currentState.split("").reduce((acc, v, i, arr) => {
    if (i > 0) {
      acc.push(arr[i - 1] + arr[i]);
    }
    return acc;
  }, []);

  pairs = pairs.map((chars) => {
    const index = keysToSearchFor.indexOf(chars);
    if (index > -1) {
      return valuesToReplaceWith[index];
    } else {
      return chars;
    }
  });

  currentState = pairs.reduce((acc, v, i) => {
    if (i > 0) {
      acc += v.substr(1);
    } else {
      acc += v;
    }
    return acc;
  }, "");
}

const charCounts = currentState.split("").reduce((acc, v) => {
  if (acc[v] === undefined) {
    acc[v] = 1;
  } else {
    acc[v] = acc[v] + 1;
  }
  return acc;
}, {});
const counts = Object.values(charCounts);
const maxCount = Math.max(...counts);
const minCount = Math.min(...counts);

answer = maxCount - minCount;

console.info("Answer:", answer);
console.timeEnd("Run time");
