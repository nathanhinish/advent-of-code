console.time("Run time");

let answer;

// target area: x=155..215, y=-132..-72
const TARGET_BOX = [155, -72, 215, -132];
// const TARGET_BOX = [20, -5, 30, -10];

function isInTargetArea(x, y, startingVx, startingVy) {
  const result =
    x >= TARGET_BOX[0] &&
    x <= TARGET_BOX[2] &&
    y <= TARGET_BOX[1] &&
    y >= TARGET_BOX[3];

  return result;
}

const workingVelos = [];

let overallMaxY = 0;

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

for (let startingVx = 1; startingVx <= TARGET_BOX[2]; startingVx++) {
  for (let startingVy = 1000; startingVy >= -1000; startingVy--) {
    const label = `${startingVy}, ${startingVx}`;

    let maxY = 0;
    let probeX = 0;
    let probeY = 0;
    let probeVx = startingVx;
    let probeVy = startingVy;
    let hitTargetArea = false;

    while (probeY >= TARGET_BOX[3] && !hitTargetArea) {
      probeX += probeVx;
      probeY += probeVy;
      if (probeY > maxY) {
        maxY = probeY;
      }

      if (isInTargetArea(probeX, probeY, startingVx, startingVy)) {
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
      if (!workingVelos.includes(label)) {
        workingVelos.push(label);
      }
      if (maxY > overallMaxY) {
        overallMaxY = maxY;
      }
    }
  }
}

answer = workingVelos.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
