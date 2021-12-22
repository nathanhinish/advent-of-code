const fs = require("fs");
const path = require("path");
const intersect = require("./intersect");
const isValidRegion = require("./isValidRegion");

const INSTR_RE =
  /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;

const CONSTRAINED_FILES = ["sample1", "sample2"];

module.exports = function parse(filename, shouldConstrainInput) {
  return fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .filter((l) => !!l)
    .map((line) => {
      const match = INSTR_RE.exec(line);
      const operation = match[1];
      let region = Array.from(match).slice(2).map(Number);

      if (
        CONSTRAINED_FILES.includes(filename) ||
        (shouldConstrainInput && filename === "input")
      ) {
        region = intersect([-50, 50, -50, 50, -50, 50], region);
      }

      if (!isValidRegion(region)) {
        return null;
      }

      return { operation, region };
    })
    .filter((instr) => !!instr);
};
