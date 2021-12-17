console.time("Run time");

let answer;

// target area: x=155..215, y=-132..-72
const TARGET_BOX = [155, -72, 215, -132];
// const TARGET_BOX = [20, -5, 30, -10];

function isInTargetArea(x, y) {
  const result =
    x >= TARGET_BOX[0] &&
    x <= TARGET_BOX[2] &&
    y <= TARGET_BOX[1] &&
    y >= TARGET_BOX[3];

  return result;
}

let overallMaxY = 0;
for (let startingVy = 1000; startingVy >= 1; startingVy--) {
  for (let startingVx = 0; startingVx < TARGET_BOX[2]; startingVx++) {
    const label = `(${startingVx}, ${startingVy})`;
    // console.info(label);
    let maxY = 0;
    let probeX = 0;
    let probeY = 0;
    let probeVx = startingVx;
    let probeVy = startingVy;
    let hitTargetArea = false;

    while (probeY >= TARGET_BOX[3]) {
      probeX += probeVx;
      if (isInTargetArea(probeX, probeY)) {
        hitTargetArea = true;
      } else {
        probeY += probeVy;
        if (probeY > maxY) {
          maxY = probeY;
        }

        if (isInTargetArea(probeX, probeY)) {
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
        break;
      }
    }
    if (hitTargetArea) {
      // console.info(
      //   `(${startingVx},${startingVy}) worked with height of ${maxY}`,
      //   probeX,
      //   probeY
      // );
      if (maxY > overallMaxY) {
        overallMaxY = maxY;
      }
      break;
    }
  }
}

// console.info("Max y", overallMaxY);
answer = overallMaxY;

console.info("Answer:", answer);
console.timeEnd("Run time");
