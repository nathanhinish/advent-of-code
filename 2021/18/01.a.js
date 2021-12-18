console.time("Run time");

const assert = require("assert");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile);

function parseLine(l) {
  return JSON.parse(l);
}

function addition(a, b) {
  return [a, b];
}

function findParentWithValue(pair, index) {
  let hasNumber = false;
  let parent = pair.parent;
  while (parent && !hasNumber) {
    const valueAtPosition = parent[index];
    if (Number.isInteger(valueAtPosition)) {
      return parent;
    } else {
      parent = parent.parent;
    }
  }
  return null;
}

function linkParents(pair, child) {
  if (Array.isArray(pair)) {
    pair.forEach((child) => {
      linkParents(child);
      child.parent = pair;
    });
  }
}

function unlinkParents(pair) {
  if (Array.isArray(pair)) {
    pair.forEach((child) => {
      unlinkParents(child);
      delete child.parent;
    });
  }
}

function runExplode(pair, depth = 0) {
  if (depth === 0) {
    linkParents(pair);
  }

  let hasExploded = false;
  const arrChildIndex = pair.findIndex((c) => Array.isArray(c));
  if (arrChildIndex === -1) {
    if (depth >= 4) {
      const leftParent = findParentWithValue(pair, 0);
      const rightParent = findParentWithValue(pair, 1);
      if (leftParent) {
        leftParent[0] = leftParent[0] + pair[0];
      }
      if (rightParent) {
        rightParent[1] = rightParent[1] + pair[1];
      }
      const thisIndex = pair.parent.indexOf(pair);
      pair.parent[thisIndex] = 0;
      pair.parent = null;

      return true;
    }
  } else {
    hasExploded = runExplode(pair[arrChildIndex], depth + 1);
  }

  if (depth === 0) {
    unlinkParents(pair);
    return pair;
  } else {
    return hasExploded;
  }
}

assert.deepEqual(runExplode([[[[[9, 8], 1], 2], 3], 4]), [[[[0, 9], 2], 3], 4]);
assert.deepEqual(runExplode([7, [6, [5, [4, [3, 2]]]]]), [7, [6, [5, [7, 0]]]]);
assert.deepEqual(runExplode([[6, [5, [4, [3, 2]]]], 1]), [[6, [5, [7, 0]]], 3]);
assert.deepEqual(
  runExplode([
    [3, [2, [1, [7, 3]]]],
    [6, [5, [4, [3, 2]]]],
  ]),
  [
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]],
  ]
);
// assert.deepEqual(
//   runExplode([
//     [3, [2, [8, 0]]],
//     [9, [5, [4, [3, 2]]]],
//   ]),
//   [
//     [3, [2, [8, 0]]],
//     [9, [5, [7, 0]]],
//   ]
// );

function splitChild() {}

const pairs = lines.map(parseLine);
// for (let i = 0; i < numbers.length; i++) {
//   const number = numbers[i];
// }

console.info("Answer:", answer);
console.timeEnd("Run time");
