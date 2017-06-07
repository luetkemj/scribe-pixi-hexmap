import { each, merge, sample } from 'lodash';
import { Grid, HEX_ORIENTATIONS } from 'honeycomb-grid';
import { terrains } from '../textures/terrains.textures';
import { getRandomHexesSample } from './utils';

const grid = Grid({
  size: 20,
  orientation: HEX_ORIENTATIONS.FLAT,
});

const hexArray = grid.rectangle({
  width: 30,
  height: 30,
  direction: 1,
});

const seedHexes = getRandomHexesSample(hexArray, 50);
// seedmap
each(seedHexes, hex => merge(hex, { texture: sample(terrains) }));

each(hexArray, (hex) => {
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
});

const world = hexArray;

export default world;
