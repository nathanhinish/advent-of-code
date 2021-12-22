const intersect = require("./intersect");
const isValidRegion = require("./isValidRegion");
const RegionMap = require("./RegionMap");
const volume = require("./volume");

module.exports = function run(data) {
  const regions = new RegionMap();
  for (let i = 0; i < data.length; i++) {
    const { operation, region } = data[i];

    const newRegions = new RegionMap();

    // For each existing region, find any intersecting
    // regions and create a new entry with the negative
    // value of the existing.
    // Ex. if an existing region has a value of 3,
    //     create a new entry with a value of -3
    regions.each((existingRegion, existingValue) => {
      const intersectingRegion = intersect(existingRegion, region);
      if (isValidRegion(intersectingRegion)) {
        newRegions.updateValue(intersectingRegion, -1 * existingValue);
      }
    });

    // Now that the intersecting areas have been reset,
    // we can add the new region as a single entity with
    // value of 1 if this is an "on" operation.
    if (operation === "on") {
      newRegions.updateValue(region, 1);
    }

    // For easier debugging (gets rid of zero values)
    // newRegions.clean();

    regions.update(newRegions);

    // Note: this actually does make the algo more performant!
    regions.clean();
  }

  const volumes = [];
  regions.each((region, value) => volumes.push(volume(region) * value));

  return volumes.reduce((sum, v) => sum + v, 0);
};
