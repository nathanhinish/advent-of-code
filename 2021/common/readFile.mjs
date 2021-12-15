import fs from "fs";

export default function readFile(filename) {
  return fs.readFileSync(filename, "utf8");
}
