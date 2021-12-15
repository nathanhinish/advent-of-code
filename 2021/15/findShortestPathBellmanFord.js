const filter_unique = require("../common/filter_unique");

const REALLY_BIG_NUMBER = 10000000000000;

module.exports = function findShortestPathBellmanFord(graph, start, finish) {
  const NUM_VERTICES = graph.map((e) => e[0]).filter(filter_unique).length;
  const NUM_EDGES = graph.length;

  var distances = {
    [start]: 0,
  };

  for (var i = 0; i < NUM_VERTICES - 1; i++) {
    for (var j = 0; j < NUM_EDGES; j++) {
      const [formVertex, toVertex, weight] = graph[j];

      if (
        (distances[formVertex] ?? REALLY_BIG_NUMBER) + weight <
        (distances[toVertex] ?? REALLY_BIG_NUMBER)
      ) {
        distances[toVertex] = distances[formVertex] + weight;
      }
    }
  }

  return distances[finish];
};
