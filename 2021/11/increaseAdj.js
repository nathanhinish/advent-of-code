let testForFlash;

module.exports = function increaseAdj(set, y, x, hasFlashed) {
  if (!testForFlash) {
    testForFlash = require("./testForFlash");
  }

  if (y > 0) {
    const prevLine = set[y - 1];

    prevLine[x]++;
    if (x > 0) {
      prevLine[x - 1]++;
    }
    if (x < prevLine.length - 1) {
      prevLine[x + 1]++;
    }
  }

  const line = set[y];
  if (x > 0) {
    line[x - 1]++;
  }
  if (x < line.length - 1) {
    line[x + 1]++;
  }

  if (y < set.length - 1) {
    const nextLine = set[y + 1];
    nextLine[x]++;
    if (x > 0) {
      nextLine[x - 1]++;
    }
    if (x < nextLine.length - 1) {
      nextLine[x + 1]++;
    }
  }

  // Test adjacent

  if (y > 0) {
    testForFlash(set, y - 1, x, hasFlashed);
    if (x > 0) {
      testForFlash(set, y - 1, x - 1, hasFlashed);
    }
    if (x < set[y].length - 1) {
      testForFlash(set, y - 1, x + 1, hasFlashed);
    }
  }

  if (x > 0) {
    testForFlash(set, y, x - 1, hasFlashed);
  }
  if (x < set[y].length - 1) {
    testForFlash(set, y, x + 1, hasFlashed);
  }

  if (y < set.length - 1) {
    testForFlash(set, y + 1, x, hasFlashed);
    if (x > 0) {
      testForFlash(set, y + 1, x - 1, hasFlashed);
    }
    if (x < set[y].length - 1) {
      testForFlash(set, y + 1, x + 1, hasFlashed);
    }
  }
};
