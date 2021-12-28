const fs = require("fs");
const path = require("path");

module.exports = function parse(filename) {
  return fs
    .readFileSync(path.join(__dirname, filename))
    .toString()
    .split("\n")
    .map((l) => l.split(""));
};
