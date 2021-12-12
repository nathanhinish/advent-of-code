console.time("Run time");

let answer;

const inputFile = process.argv[2];

const lines = require("../common/getLinesOfFile")(inputFile);

function isLower(char) {
  return char.toLowerCase() === char;
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

const nodes = [];
const edges = {};

const allSmallCaves = [];

function getPathsToEnd(node, edgesObj, visitedCaves, hasTriggered) {
  edgesObj = copy(edgesObj);
  visitedCaves = copy(visitedCaves);
  if (node !== "start" && isLower(node)) {
    if (visitedCaves.includes(node)) {
      hasTriggered = true;
    } else {
      visitedCaves.push(node);
    }

    if (hasTriggered && visitedCaves.includes(node)) {
      // Remove all edges ending with visited caves
      Object.keys(edgesObj).forEach((key) => {
        edgesObj[key] = edgesObj[key].filter((v) => !visitedCaves.includes(v));
      });
    }
  }

  const fragments = edgesObj[node].reduce((acc, otherNode) => {
    if (otherNode === "start") {
      return acc;
    }
    if (otherNode === "end") {
      acc.push("end");
    } else {
      acc.push(
        ...getPathsToEnd(otherNode, edgesObj, visitedCaves, hasTriggered)
      );
    }
    return acc;
  }, []);

  return fragments.map((f) => `${node},${f}`);
}

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const [node1, node2] = line.split("-");

  if (!nodes.includes(node1)) {
    nodes.push(node1);
    edges[node1] = [];
  }

  if (!edges[node1].includes(node2) && node2 !== "start") {
    edges[node1].push(node2);
  }

  if (!nodes.includes(node2)) {
    nodes.push(node2);
    edges[node2] = [];
  }

  if (!edges[node2].includes(node1) && node1 !== "start") {
    edges[node2].push(node1);
  }
}

allSmallCaves.push(
  ...nodes.filter(isLower).filter((v) => !["start", "end"].includes(v))
);

const paths = getPathsToEnd("start", edges, [], false);

answer = paths.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
