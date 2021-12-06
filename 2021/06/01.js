console.time("Run time");
process.chdir(__dirname);
let answer;

const lines = require("../common/getLinesOfFile")("./input");

let fishStates = lines[0].split(",").map((f) => parseInt(f, 10));
console.info(fishStates);
for (let dayNum = 1; dayNum <= 80; dayNum++) {
  let numNewFish = 0;
  fishStates = fishStates.map((s) => {
    if (s === 0) {
      s = 6;
      numNewFish = numNewFish + 1;
    } else {
      s = s - 1;
    }
    return s;
  });
  for (let i = 0; i < numNewFish; i++) {
    fishStates.push(8);
  }
}

answer = fishStates.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
