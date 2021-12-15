console.time("Run time");

let answer;

const inputFile = process.argv[2];

import readFile from "../common/readFile.mjs";
import astar from "../common/astar.mjs";
import Graph from "../common/Graph.mjs";

let cave = readFile(inputFile)
  .split("\n")
  .map((l) => l.split("").map(Number));

const NUM_VERTICES = cave.reduce((a, r) => a + r.length, 0);
console.info("Number of vertices", NUM_VERTICES);

const START = [0, 0];
const FINISH = [cave.length - 1, Math.max(...cave.map((r) => r.length)) - 1];

const graph = new Graph(cave);

const start = graph.grid[START[0]][START[1]];
const finish = graph.grid[FINISH[0]][FINISH[1]];

const path = astar.search(graph, start, finish);
const totalRisk = path.reduce((acc, node) => acc + node.weight, 0);

answer = totalRisk;

console.info("Answer:", answer);
console.timeEnd("Run time");
