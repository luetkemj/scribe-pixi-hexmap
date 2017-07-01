import { cellularAutomata } from '../lib/cellular-automata';
import * as hexMath from '../lib/hexMath';

const config = {
  map: {
    width: 100,
    height: 100,
    hexSize: 20,
  },

  zoom: {
    multiplier: 2,
    origin: { x: 0, y: 0 },
  },
};

const data = cellularAutomata({
  gridColumns: config.map.width,
  gridRows: config.map.height,
  hexSize: config.map.hexSize,
  seedChance: config.map.seedChance,
  seedChanceRatios: config.map.seedChanceRatios,
  iterations: 15,
  percentOpen: 50,
});

// /////////////////////////////////////////
// EXPORTS
// /////////////////////////////////////////
const world = {};

world.data = data.hexes;
world.width = ((hexMath.hexWidth(config.map.hexSize) * config.map.height) / 2) + 40;
world.height = hexMath.hexHeight(config.map.hexSize) * config.map.height;

export default world;
