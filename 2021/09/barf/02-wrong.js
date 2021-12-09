/**

  During this, I was under the impression that I was looking for bumps
  that were some value lower than 9.

*/

console.time("Run time");
const filter_unique = require("../common/filter_unique");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");
const spots = lines.map((l) => l.split("").map((v) => parseInt(v, 10)));

// Add code here
const lows = [];

const basins = [];

function calcIsLowPoint(set, x, y) {
  const line = set[y];
  const prevLine = y > 0 ? set[y - 1] : null;
  const nextLine = y < set.length - 1 ? spots[y + 1] : null;

  let isLowPoint = true;

  const val = line[x];
  if (x > 0 && line[x - 1] <= val) {
    isLowPoint = false;
  } else if (x < line.length - 1 && line[x + 1] <= val) {
    isLowPoint = false;
  } else if (prevLine && prevLine[x] <= val) {
    isLowPoint = false;
  } else if (nextLine && nextLine[x] <= val) {
    isLowPoint = false;
  }

  return isLowPoint;
}

const relHeights = [];
for (let y = 0; y < spots.length; y++) {
  const line = spots[y];
  const prevLine = y > 0 ? spots[y - 1] : null;
  const nextLine = y < spots.length - 1 ? spots[y + 1] : null;
  for (let x = 0; x < line.length; x++) {
    const val = line[x];
    if (!relHeights[y]) {
      relHeights[y] = [];
    }
    relHeights[y][x] = {
      l: x === 0 ? null : val - line[x - 1],
      r: x === line.length - 1 ? null : val - line[x + 1],
      t: y === 0 ? null : val - prevLine[x],
      b: y === spots.length - 1 ? null : val - nextLine[x],
    };
  }
}

function calcSizeOfHLine(x, y) {
  let leftMost = x;
  if (x > 0) {
    for (let x2 = x - 1; x >= 0; x--) {
      const relHeight = relHeights[y][x2];
      if (relHeight.l < 0 || relHeight.l === null) {
        leftMost = x2;
      } else {
        break;
      }
    }
  }
  let rightMost = x;
  if (x < spots.length - 1) {
    for (let x2 = x + 1; x < spots[y].length; x++) {
      const relHeight = relHeights[y][x2];
      if (relHeight.r < 0 || relHeight.r === null) {
        rightMost = x2;
      } else {
        break;
      }
    }
  }

  return [leftMost, rightMost];
}

function calculateSize(x, y) {
  let topMost = y;
  const lineSizes = [];
  if (y > 0) {
    for (let y2 = y - 1; y2 >= 0; y2--) {
      const relHeight = relHeights[y2][x];
      if (relHeight.t < 0) {
        topMost = y2;
        const xCoords = calcSizeOfHLine(x, y2);
        console.info(xCoords);
        lineSizes.push(xCoords[1] - xCoords[0]);
      } else {
        break;
      }
    }
  }
  let bottomMost = y;
  if (y > 0) {
    for (let y2 = y - 1; y2 >= 0; y2--) {
      const relHeight = relHeights[y2][x];
      if (relHeight.b < 0) {
        bottomMost = y2;
        const xCoords = calcSizeOfHLine(x, y2);
        console.info(xCoords);
        lineSizes.push(xCoords[1] - xCoords[0]);
      } else {
        break;
      }
    }
  }

  console.info(lineSizes.reduce((a, v) => a + v, 0));
}

let log = false;

function getAdjThatAreLower(x, y, skip, checked) {
  const row = relHeights[y];

  if (!row) {
    return [];
  }
  const rel = relHeights[y][x];
  if (log) {
    console.info(x, y, skip, rel);
  }

  let isLower = true;

  if (
    skip !== "top" &&
    rel.top !== null &&
    !checked.includes(`${x},${y - 1}`) &&
    rel.t > 0
  ) {
    isLower = false;
  } else if (
    skip !== "bottom" &&
    rel.b !== null &&
    !checked.includes(`${x},${y + 1}`) &&
    rel.b > 0
  ) {
    isLower = false;
  } else if (
    skip !== "left" &&
    rel.l !== null &&
    !checked.includes(`${x - 1},${y}`) &&
    rel.l > 0
  ) {
    isLower = false;
  } else if (
    skip !== "right" &&
    rel.r !== null &&
    !checked.includes(`${x + 1},${y}`) &&
    rel.r > 0
  ) {
    isLower = false;
  }

  if (!isLower) {
    return [];
  }

  checked.push(`${x},${y}`);

  const points = [`${x},${y}`];

  if (skip !== "top" && y > 0) {
    const str = `${x},${y - 1}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreLower(x, y - 1, "bottom", checked));
    }
  }
  if (skip !== "bottom" && y < spots.length - 1) {
    const str = `${x},${y + 1}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreLower(x, y + 1, "top", checked));
    }
  }
  if (skip !== "left" && x > 0) {
    const str = `${x - 1},${y}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreLower(x - 1, y, "right", checked));
    }
  }
  if (skip !== "right" && x < spots[y].length - 1) {
    const str = `${x + 1},${y}`;
    if (!checked.includes(str)) {
      points.push(...getAdjThatAreLower(x + 1, y, "left", checked));
    }
  }

  return points.filter(filter_unique);
}

function getBasinPoints(x, y) {
  if (x === 89 && y === 99) {
    log = true;
  } else {
    // log = false;
  }
  const points = getAdjThatAreLower(x, y, null, []);
  const uniq = points.filter(filter_unique);
  return uniq;
}

for (let y = 0; y < spots.length; y++) {
  const line = spots[y];
  for (let x = 0; x < line.length; x++) {
    let isLowPoint = calcIsLowPoint(spots, x, y);
    if (isLowPoint) {
      basins.push(getBasinPoints(x, y));
    }
  }
}

console.info(basins[basins.length - 1]);

const biggest = basins.sort((a, b) => b.length - a.length).slice(0, 3);

console.info(basins[0]);
console.info(basins[0].length);
answer = biggest.reduce((a, v) => a * v.length, 1);

console.info("Answer:", answer);
console.timeEnd("Run time");
