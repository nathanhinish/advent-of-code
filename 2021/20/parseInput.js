module.exports = function parseInput(file) {
  return require("fs")
    .readFileSync(file, "utf8")
    .split("\n\n")
    .map((v, i) => {
      if (i === 0) {
        return v.split("\n").join("");
      }
      return v;
    });
};
