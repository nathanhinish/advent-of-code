const ERROR_VAL = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

module.exports = function getErrorScore(c) {
  return ERROR_VAL[c] || 0;
};
