module.exports = function volume(r) {
  return (1 + r[1] - r[0]) * (1 + r[3] - r[2]) * (1 + r[5] - r[4]);
};
