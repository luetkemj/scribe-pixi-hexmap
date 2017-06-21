import { each, merge } from 'lodash';
import { rectangle } from '../lib/hexMath';
// import { Grid, HEX_ORIENTATIONS } from 'honeycomb-grid';
import { terrains } from '../textures/terrains.textures';

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

const hexes = rectangle({
  gridColumns: config.map.width,
  gridRows: config.map.height,
  hexSize: 20,
}).hexes;

each(hexes, (hex) => {
  merge(hex, { texture: terrains.textures.mountains });
});

// /////////////////////////////////////////
// MAP 2
// make zoomed in map that mimics the first!
// /////////////////////////////////////////
function zoomMap() {
  const hexes2 = rectangle({
    width: config.map.width * config.zoom.multiplier,
    height: config.map.height * config.zoom.multiplier,
    hexSize: 20,
  });

  each(hexes2, (hex) => {
    merge(hex, { texture: terrains.textures.hills });
  });

  return hexes2;
}


// console.log(seedHexes);
// /////////////////////////////////////////
// EXPORTS
// /////////////////////////////////////////
const world = hexes;
export default world;
export const world2 = zoomMap();
