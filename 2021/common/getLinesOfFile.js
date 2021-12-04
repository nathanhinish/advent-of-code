const fs = require("fs");

module.exports = function getLinesOfFile(filename) {
  return fs.readFileSync(filename, "utf8").split("\n");
};
