module.exports = function intersect(r1, r2) {
  return [
    // x
    Math.max(r1[0], r2[0]),
    Math.min(r1[1], r2[1]),
    // y
    Math.max(r1[2], r2[2]),
    Math.min(r1[3], r2[3]),
    // z
    Math.max(r1[4], r2[4]),
    Math.min(r1[5], r2[5]),
  ];
};
