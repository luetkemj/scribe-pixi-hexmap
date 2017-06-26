import * as hexMap from '../lib/hexMap';
import * as hexMath from '../lib/hexMath';

const config = {
  map: {
    width: 100,
    height: 100,
    hexSize: 20,
    seedChance: 15,
    // when a GUI is made - the schema should change so we don't have to process it into the
    // schema we want which is:
    // {
    //   name: 'name',
    //   value: 1,
    // }
    seedChanceRatios: [
      { coast: 1 },
      { desert: 2 },
      { forest: 3 },
      { hills: 4 },
      { mountains: 5 },
      { plains: 6 },
      { swamp: 7 },
      { water: 8 },
    ],
  },

  zoom: {
    multiplier: 2,
    origin: { x: 0, y: 0 },
  },
};

const data = hexMap.rectangle({
  gridColumns: config.map.width,
  gridRows: config.map.height,
  hexSize: config.map.hexSize,
  seedChance: config.map.seedChance,
  seedChanceRatios: config.map.seedChanceRatios,
});

// /////////////////////////////////////////
// EXPORTS
// /////////////////////////////////////////
const world = {};

world.data = data.hexes;
world.width = ((hexMath.hexWidth(config.map.hexSize) * config.map.height) / 2) + 40;
world.height = hexMath.hexHeight(config.map.hexSize) * config.map.height;

export default world;
