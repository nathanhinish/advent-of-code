module.exports = function isValidRegion(r) {
  return r[0] <= r[1] && r[2] <= r[3] && r[4] <= r[5];
};
