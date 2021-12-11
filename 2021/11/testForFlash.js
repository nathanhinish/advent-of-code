let increaseAdj;

module.exports = function testForFlash(set, y, x, hasFlashed) {
  if (!increaseAdj) {
    increaseAdj = require("./increaseAdj");
  }

  const val = set[y][x];

  if (isNaN(val)) {
    throw new Error(`${x}, ${y} NaN`);
  }

  const coordStr = `${x},${y}`;
  if (val > 9 && !hasFlashed.includes(coordStr)) {
    hasFlashed.push(coordStr);
    increaseAdj(set, y, x, hasFlashed);
  }
};
