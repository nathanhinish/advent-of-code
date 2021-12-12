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

function getPathsToEnd(node, edgesObj) {
  const e = copy(edgesObj);
  if (isLower(node)) {
    Object.keys(e).forEach((key) => {
      e[key] = e[key].filter((v) => v !== node);
    });
  }

  const fragments = e[node].reduce((acc, otherNode) => {
    if (otherNode === "end") {
      acc.push("end");
    } else {
      acc.push(...getPathsToEnd(otherNode, e));
    }
    return acc;
  }, []);

  return fragments.map((f) => `${node}-${f}`);
}

for (let y = 0; y < lines.length; y++) {
  const line = lines[y];
  const [node1, node2] = line.split("-");

  if (!nodes.includes(node1)) {
    nodes.push(node1);
    edges[node1] = [];
  }

  if (!edges[node1].includes(node2)) {
    edges[node1].push(node2);
  }

  if (!nodes.includes(node2)) {
    nodes.push(node2);
    edges[node2] = [];
  }

  if (!edges[node2].includes(node1)) {
    edges[node2].push(node1);
  }
}

const paths = getPathsToEnd("start", edges);

answer = paths.length;

console.info("Answer:", answer);
console.timeEnd("Run time");
