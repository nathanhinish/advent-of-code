const getLinesOfFile = require("../common/getLinesOfFile");
const lines = getLinesOfFile("./input");

let hPos = 0;
let vPos = 0;

lines.forEach((l) => {
  const [dir, amt] = l.split(" ");
  switch (dir) {
    case "up":
      vPos = vPos - parseInt(amt, 10);
      break;
    case "down":
      vPos = vPos + parseInt(amt, 10);
      break;
    case "forward":
      hPos = hPos + parseInt(amt, 10);
      break;
    case "backward":
      hPos = hPos - parseInt(amt, 10);
      break;
    default:
      console.info(dir);
  }
});

console.info(vPos * hPos);
