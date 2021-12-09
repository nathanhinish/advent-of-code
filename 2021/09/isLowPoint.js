module.exports = function isLowPoint(set, x, y) {
  const line = set[y];
  const prevLine = y > 0 ? set[y - 1] : null;
  const nextLine = y < set.length - 1 ? set[y + 1] : null;

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
};
