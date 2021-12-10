const { OPENING_CHARS, CLOSING_CHARS, COORES_CLOSING } = require("./constants");

module.exports = function getSyntaxError(line) {
  const chars = line.split("");
  const nextClosing = [];
  const failed = chars.find((c, idx, arr) => {
    if (OPENING_CHARS.includes(c)) {
      nextClosing.unshift(COORES_CLOSING[c]);
    } else if (CLOSING_CHARS.includes(c)) {
      const expected = nextClosing.shift();
      return expected !== c;
    }
  });

  return failed;
};
