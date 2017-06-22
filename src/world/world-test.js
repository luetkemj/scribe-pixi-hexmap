import { each, merge } from 'lodash';
import * as hexMath from '../lib/hexMath';
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

const data = hexMath.rectangle({
  gridColumns: config.map.width,
  gridRows: config.map.height,
  hexSize: 20,
  seedChance: 10,
});

each(data.idMapDirt, (idDirt) => {
  const shortest = {};

  each(data.idMapSeeds, (idSeed) => {
    const distance = hexMath.distance(data.hexes[idDirt], data.hexes[idSeed]);

    if (!shortest.distance || distance < shortest.distance) {
      merge(shortest, {
        distance,
        idSeed,
      });
    }

    data.hexes[idDirt].texture = data.hexes[shortest.idSeed].texture;

    merge(data.hexes[idDirt], {
      texture: data.hexes[shortest.idSeed].texture,
      isSeed: false,
      terrain: data.hexes[shortest.idSeed].terrain,
      terrainKey: data.hexes[shortest.idSeed].terrainKey,
    });
  });
});

// /////////////////////////////////////////
// MAP 2
// make zoomed in map that mimics the first!
// /////////////////////////////////////////
function zoomMap() {
  const hexes2 = hexMath.rectangle({
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
const world = data.hexes;
export default world;
export const world2 = zoomMap();
