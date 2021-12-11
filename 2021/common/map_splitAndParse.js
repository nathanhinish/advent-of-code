module.exports = function map_splitAndParse(l) {
  return l.split("").map((v) => parseInt(v, 10));
};
