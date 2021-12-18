console.time("Run time");

const { GPU } = require("gpu.js");
let answer;

const gpu = new GPU();
// target area: x=155..215, y=-132..-72
const TARGET_BOX = [155, -72, 215, -132];
// const TARGET_BOX = [20, -5, 30, -10];

const Y_RANGE = 16384;

function isInTargetArea(x, y, startingVx, startingVy) {
  const result =
    x >= TARGET_BOX[0] &&
    x <= TARGET_BOX[2] &&
    y <= TARGET_BOX[1] &&
    y >= TARGET_BOX[3];

  return result;
}

function getNumberOfSteps(vx) {
  let pos = 0;
  let steps = 0;
  while (pos <= TARGET_BOX[2] && vx !== 0) {
    steps++;
    pos += vx;
    if (vx > 0) {
      vx--;
    } else if (vx < 0) {
      vx++;
    }
  }
  return steps;
}
const doesVelocityWork = gpu
  .createKernel(function (yRange, targetBox) {
    function isInTargetArea(x, y, box) {
      return x >= box[0] && x <= box[2] && y <= box[1] && y >= box[3] ? 1 : 0;
    }

    const startingVx = this.thread.x + 1;
    const startingVy = this.thread.y - Math.floor(yRange / 2);

    let probeX = 0;
    let probeY = 0;
    let probeVx = startingVx;
    let probeVy = startingVy;
    let hitTargetArea = false;

    while (probeY >= targetBox[3] && !hitTargetArea) {
      probeX += probeVx;
      probeY += probeVy;

      if (isInTargetArea(probeX, probeY, targetBox) === 1) {
        hitTargetArea = true;
      } else {
        probeVy -= 1;
        if (probeVx > 0) {
          probeVx -= 1;
        } else if (probeVx < 0) {
          probeVx += 1;
        }
      }
    }

    if (hitTargetArea) {
      return 1;
    }

    return 0;
  })
  .setOutput([TARGET_BOX[2] - 1, Y_RANGE]);

const results = doesVelocityWork(Y_RANGE, TARGET_BOX);

results.forEach((row, x) => {
  row.forEach((val, y) => {
    if (val === 1) {
      console.info(x, y);
    }
  });
});

console.info("Answer:", answer);
console.timeEnd("Run time");
