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

const beaconList = [];

for (const scanner of reorientedScanners) {
  const { position, beacons } = scanner;
  for (const [x, y, z] of beacons) {
    const key = `${x + position[0]},${y + position[1]},${z + position[2]}`;
    if (!beaconList.includes(key)) {
      beaconList.push(key);
    }
  }
}

answer = beaconList.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
