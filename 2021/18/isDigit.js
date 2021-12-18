const DIGITS = Array(10)
  .fill(0)
  .map((v, i) => `${i}`);

module.exports = function isDigit(char) {
  return DIGITS.includes(char);
};
