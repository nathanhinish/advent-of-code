console.time("Run time");

const reorientScanners = require("./reorientScanners");

let answer;

const inputFile = process.argv[2];

const NEW_SCANNER_LINE = /--- scanner \d+ ---/;
const inputData = [];
require("../common/getLinesOfFile")(inputFile)
  .filter((l) => !!l)
  .forEach((v) => {
    if (NEW_SCANNER_LINE.test(v)) {
      inputData.push([]);
    } else {
      inputData[inputData.length - 1].push(v.split(",").map(Number));
    }
  });

const reorientedScanners = reorientScanners(inputData);

let farthestDistance = 0;

const positions = reorientedScanners.map((scanner) => scanner.position);

for (const [x, y, z] of positions) {
  for (const [x2, y2, z2] of positions) {
    farthestDistance = Math.max(
      farthestDistance,
      Math.abs(x - x2) + Math.abs(y - y2) + Math.abs(z - z2)
    );
  }
}

answer = farthestDistance;

console.info("Answer:", answer);
console.timeEnd("Run time");
