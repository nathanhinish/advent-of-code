console.time("Run time");

let answer;

const inputFile = process.argv[2];
const NUM_STEPS = 40;

const lines = require("../common/getLinesOfFile")(inputFile);

const pairMap = lines.slice(2).reduce((acc, l) => {
  const [key, charToInsert] = l.split(" -> ");
  acc[key] = [key[0] + charToInsert, charToInsert + key[1]];
  return acc;
}, {});

const template = lines[0];

let accumPairs = {};

template.split("").forEach((v, i) => {
  if (i > 0) {
    const key = template[i - 1] + v;
    accumPairs[key] = (accumPairs[key] ?? 0) + 1;
  }
});

for (let step = 0; step < NUM_STEPS; step++) {
  const stepOperations = {};
  Object.keys(accumPairs).forEach((pair) => {
    const [firstPair, secondPair] = pairMap[pair];
    stepOperations[firstPair] =
      (stepOperations[firstPair] ?? 0) + accumPairs[pair];
    stepOperations[secondPair] =
      (stepOperations[secondPair] ?? 0) + accumPairs[pair];
  });
  accumPairs = stepOperations;
}

const charCounts = {};
for (let key in accumPairs) {
  const lastChar = key[1];
  charCounts[lastChar] = (charCounts[lastChar] ?? 0) + accumPairs[key];
}

const counts = Object.values(charCounts);

answer = Math.max(...counts) - Math.min(...counts);

console.info("Answer:", answer);
console.timeEnd("Run time");
