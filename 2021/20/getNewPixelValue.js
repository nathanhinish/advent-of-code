module.exports = function getNewPixelValue(values, enhAlgo) {
  const binStr = values.map((c) => (c === "#" ? "1" : "0")).join("");
  const index = parseInt(binStr, 2);
  return enhAlgo[index];
};
