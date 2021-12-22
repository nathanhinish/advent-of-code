module.exports = function run(data) {
  const reactorState = {};
  data.forEach((instr, i) => {
    const { operation, region } = instr;

    for (let x = region[0] + 50; x <= region[1] + 50; x++) {
      for (let y = region[2] + 50; y <= region[3] + 50; y++) {
        for (let z = region[4] + 50; z <= region[5] + 50; z++) {
          const key = `${x},${y},${z}`;
          if (operation === "on") {
            reactorState[key] = 1;
          } else {
            delete reactorState[key];
          }
        }
      }
    }
  });

  return Object.keys(reactorState).length;
};
