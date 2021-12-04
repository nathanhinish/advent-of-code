const getLinesOfFile = require("../common/getLinesOfFile");

const lines = getLinesOfFile("./input");

let hPos = 0;
let vPos = 0;
let currAim = 0;

lines.forEach((l) => {
  let [dir, amt] = l.split(" ");
  amt = parseInt(amt, 10);
  switch (dir) {
    case "up":
      currAim = currAim - amt;
      break;
    case "down":
      currAim = currAim + amt;
      break;
    case "forward":
      hPos = hPos + amt;
      vPos = vPos + amt * currAim;
      break;
    case "backward":
      hPos = hPos - amt;
      vPos = vPos - amt * currAim;
      break;
    default:
      console.info(dir);
  }
});

console.info(vPos * hPos);
