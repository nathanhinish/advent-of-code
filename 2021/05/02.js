console.time("Run time");
process.chdir(__dirname);
let answer;

const COORD_RE = /(\d+),(\d+) -> (\d+),(\d+)/;

const lines = require("../common/getLinesOfFile")("./input");

let maxX = 0;
let maxY = 0;

const coords = lines.map((l) => {
  const m = COORD_RE.exec(l);

  const x1 = parseInt(m[1], 10);
  const y1 = parseInt(m[2], 10);
  const x2 = parseInt(m[3], 10);
  const y2 = parseInt(m[4], 10);

  maxX = Math.max(maxX, x1, x2);
  maxY = Math.max(maxY, y1, y2);

  return { x1, y1, x2, y2 };
});

const numHits = [];
for (let y = 0; y <= maxY; y++) {
  const newRow = [];
  for (let x = 0; x <= maxX; x++) {
    newRow.push(0);
  }
  numHits.push(newRow);
}

console.info("max x", maxX);
console.info("max y", maxY);

console.info("min x", Math.min(...coords.map((c) => Math.min(c.x1, c.x2))));
console.info("min y", Math.min(...coords.map((c) => Math.min(c.y1, c.y2))));

for (let i = 0; i < coords.length; i++) {
  const coord = coords[i];
  const { x1, y1, x2, y2 } = coord;

  if (y1 === y2) {
    // horiz
    const rowToChange = numHits[y1];
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      const currVal = rowToChange[x];
      rowToChange[x] = currVal + 1;
    }
  } else if (x1 === x2) {
    // vert
    const colIndexToChange = x1;
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      const rowToChange = numHits[y];
      const currVal = rowToChange[colIndexToChange];
      rowToChange[colIndexToChange] = currVal + 1;
    }
  } else {
    if (y1 < y2) {
      const xDir = (x2 - x1) / Math.abs(x1 - x2);
      for (let i = 0; i <= y2 - y1; i++) {
        const row = numHits[y1 + i];
        const currVal = row[x1 + i * xDir];
        row[x1 + i * xDir] = currVal + 1;
      }
    } else {
      const xDir = (x1 - x2) / Math.abs(x1 - x2);
      for (let i = 0; i <= y1 - y2; i++) {
        const row = numHits[y2 + i];
        const currVal = row[x2 + i * xDir];
        row[x2 + i * xDir] = currVal + 1;
      }
    }
  }
}

let greaterThan1 = 0;
for (let y = 0; y < numHits.length; y++) {
  const row = numHits[y];

  for (let x = 0; x <= row.length; x++) {
    if (row[x] > 1) {
      greaterThan1 = greaterThan1 + 1;
    }
  }
}

answer = greaterThan1;

require("fs").writeFileSync(
  "./output",
  numHits.map((r) => r.join("")).join("\n"),
  "utf8"
);

console.info("Answer:", answer);
console.timeEnd("Run time");
