console.time("Run time");
const filter_unique = require("../common/filter_unique");
const isLowPoint = require("./isLowPoint");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const spots = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

const basins = [];

function getAdjThatAreNotNine(x, y, skip, checked) {
  const val = spots[y][x];

  if (val === 9) {
    return [];
  }

  checked.push(`${x},${y}`);

  const points = [`${x},${y}`];

  if (skip !== "top" && y > 0) {
    const str = `${x},${y - 1}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreNotNine(x, y - 1, "bottom", checked));
    }
  }
  if (skip !== "bottom" && y < spots.length - 1) {
    const str = `${x},${y + 1}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreNotNine(x, y + 1, "top", checked));
    }
  }
  if (skip !== "left" && x > 0) {
    const str = `${x - 1},${y}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreNotNine(x - 1, y, "right", checked));
    }
  }
  if (skip !== "right" && x < spots[y].length - 1) {
    const str = `${x + 1},${y}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreNotNine(x + 1, y, "left", checked));
    }
  }

  return points.filter(filter_unique);
}

function getBasinPoints(x, y) {
  const points = getAdjThatAreNotNine(x, y, null, []);
  const uniq = points.filter(filter_unique);
  return uniq;
}

for (let y = 0; y < spots.length; y++) {
  const line = spots[y];
  for (let x = 0; x < line.length; x++) {
    if (isLowPoint(spots, x, y)) {
      basins.push(getBasinPoints(x, y));
    }
  }
}

const biggest = basins.sort((a, b) => b.length - a.length).slice(0, 3);

answer = biggest.reduce((a, v) => a * v.length, 1);

console.info("Answer:", answer);
console.timeEnd("Run time");
