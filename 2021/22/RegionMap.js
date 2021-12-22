module.exports = class RegionMap {
  toKey = (region) => region.join(",");
  fromKey = (key) => key.split(",").map(Number);

  constructor() {
    this._map = {};
  }

  updateValue(region, value) {
    if (typeof region !== "string") {
      region = this.toKey(region);
    }
    if (this._map[region] === undefined) {
      this._map[region] = 0;
    }
    this._map[region] += value;
  }

  clean() {
    Object.keys(this._map).forEach((key) => {
      if (this._map[key] === 0) {
        delete this._map[key];
      }
    });
  }

  getObject() {
    return Object.assign({}, this._map);
  }

  update(map) {
    if (map.getObject !== undefined) {
      map = map.getObject();
    }
    Object.keys(map).forEach((key) => {
      this.updateValue(key, map[key]);
    });
  }

  // (region, value) => {}
  each(fn) {
    Object.keys(this._map).forEach((key) => {
      fn(this.fromKey(key), this._map[key]);
    });
  }

  toString() {
    return this.getObject();
  }
};
