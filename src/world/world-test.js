import * as hexMap from '../lib/hexMap';

const config = {
  map: {
    width: 32,
    height: 16,
    seeds: 50,
  },

  zoom: {
    multiplier: 2,
    origin: { x: 0, y: 0 },
  },
};

const data = hexMap.rectangle({
  gridColumns: config.map.width,
  gridRows: config.map.height,
  hexSize: 20,
  seedChance: 15,
});

// console.log(seedHexes);
// /////////////////////////////////////////
// EXPORTS
// /////////////////////////////////////////
const world = data.hexes;
export default world;
