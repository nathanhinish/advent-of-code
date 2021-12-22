const INSTR_RE =
  /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/;

module.exports = function parse(filename) {
  const data = require("fs").readFileSync(filename, "utf8");
  return data
    .split("\n")
    .filter((l) => !!l)
    .map((line) => {
      const match = INSTR_RE.exec(line);
      const coords = Array.from(match).slice(2).map(Number);

      return {
        operation: match[1],
        region: coords,
      };
    })
    .filter((instr) => !!instr);
};
