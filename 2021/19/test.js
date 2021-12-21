const fs = require("fs");

const inputFile = process.argv[2];
const reorientScanners = require("./reorientScanners");

// Part 1: Assemble the full map of beacons. How many beacons are there?
const p1 = (scanners) => {
  const uniquePoints = new Set();

  for (const scanner of scanners) {
    console.info(scanner);
    const { position, beacons } = scanner;
    for (const [x, y, z] of beacons) {
      uniquePoints.add(
        x + position[0] + " " + (y + position[1]) + " " + (z + position[2])
      );
    }
  }

  return uniquePoints.size;
};

// Part 2: What is the largest Manhattan distance between any two scanners?
const p2 = (scanners) => {
  let maxDistance = 0;

  const scannerPositions = scanners.map((scanner) => scanner.position);

  for (const [x, y, z] of scannerPositions) {
    for (const [xx, yy, zz] of scannerPositions) {
      maxDistance = Math.max(
        maxDistance,
        Math.abs(x - xx) + Math.abs(y - yy) + Math.abs(z - zz)
      );
    }
  }

  return maxDistance;
};

const input = fs
  .readFileSync(inputFile)
  .toString()
  .split("\n")
  .filter((line) => line !== "");

const scannerData = [];

for (const line of input) {
  if (line.includes("scanner")) {
    scannerData.push([]);
  } else {
    scannerData[scannerData.length - 1].push(line.split(",").map(Number));
  }
}

console.time("Time to Reorient Scanners");
const orientedScanners = reorientScanners(scannerData);
console.timeEnd("Time to Reorient Scanners");
console.log();

console.time("Part 1 Time");
console.log("Part 1:", p1(orientedScanners));
console.timeEnd("Part 1 Time");
console.log();

console.time("Part 2 Time");
console.log("Part 2:", p2(orientedScanners));
console.timeEnd("Part 2 Time");
