import { each, find, map, merge, sample } from 'lodash';
import { Grid, HEX_ORIENTATIONS } from 'honeycomb-grid';
import { terrains } from '../textures/terrains.textures';
import { getRandomHexesSample } from './utils';

const config = {
  map: {
    width: 32,
    height: 16,
    seeds: 50,
  },

  zoom: {
    multiplier: 8,
    origin: { x: 0, y: 0 },
  },
};

const grid = Grid({
  size: 20,
  orientation: HEX_ORIENTATIONS.FLAT,
});

const hexArray = grid.rectangle({
  width: config.map.width,
  height: config.map.height,
  direction: 1,
});

const seedHexes = getRandomHexesSample(hexArray, config.map.seeds);

// seedmap
each(seedHexes, (hex, index) => {
  const terrain = sample(terrains.keys);
  merge(hex, {
    texture: terrains.textures[terrain],
    terrainKey: index,
    terrain,
    point: grid.hexToPoint(hex),
    isSeed: true,
  });
});

// grow seeds (make zones)
each(hexArray, (hex) => {
  if (!hex.isSeed) {
    const shortest = {};
    each(seedHexes, (seed) => {
      const distance = grid.Hex.distance(hex, seed);
      if (!shortest.distance || distance < shortest.distance) {
        merge(shortest, {
          distance,
          seed,
        });
      }

      merge(hex, { texture: shortest.seed.texture });
    });
  }
});

// /////////////////////////////////////////
// MAP 2
// make zoomed in map that mimics the first!
// /////////////////////////////////////////
function zoomMap() {
  const grid2 = Grid({
    size: 20,
    orientation: HEX_ORIENTATIONS.FLAT,
  });

  const hexArray2 = grid2.rectangle({
    width: config.map.width * config.zoom.multiplier,
    height: config.map.height * config.zoom.multiplier,
    direction: 1,
    origin: config.zoom.origin,
  });

  // get these based on the original grid
  const seedHexes2 = map(seedHexes, (seed) => {
    const point = {
      x: seed.point.x * config.zoom.multiplier,
      y: seed.point.y * config.zoom.multiplier,
    };
    const hex = grid2.pointToHex(point);

    merge(hex, {
      texture: seed.texture,
      terrainKey: seed.terrainKey,
      terrain: seed.terrain,
      isSeed: seed.isSeed,
      point,
    });
    return hex;
  });

  each(seedHexes2, (seed) => {
    const seedHex = find(hexArray2, { x: seed.x, y: seed.y, z: seed.z });
    return merge(seedHex, seed);
  });

  // grow seeds (make zones)
  each(hexArray2, (hex) => {
    if (!hex.isSeed) {
      const shortest = {};
      each(seedHexes2, (seed) => {
        const distance = grid.Hex.distance(hex, seed);
        if (!shortest.distance || distance < shortest.distance) {
          merge(shortest, {
            distance,
            seed,
          });
        }

        merge(hex, { texture: shortest.seed.texture });
      });
    }
  });

  return hexArray2;
}


// console.log(seedHexes);
// /////////////////////////////////////////
// EXPORTS
// /////////////////////////////////////////
const world = hexArray;
export default world;
export const world2 = zoomMap();
