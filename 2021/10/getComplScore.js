const COMP_VAL = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

module.exports = function getComplScore(chars) {
  return chars.reduce((a, v) => {
    a = a * 5;
    a = a + COMP_VAL[v];
    return a;
  }, 0);
};
