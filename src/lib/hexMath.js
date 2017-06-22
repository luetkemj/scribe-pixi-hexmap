import { random, sample } from 'lodash';
import { terrains } from '../textures/terrains.textures';

export function distance(hex1, hex2) {
  return (Math.abs(hex1.x - hex2.x) + Math.abs(hex1.y - hex2.y) + Math.abs(hex1.z - hex2.z)) / 2;
}

export function hexWidth(size) {
  return size * 2;
}

export function hexHeight(size) {
  return (Math.sqrt(3) / 2) * (size * 2);
}

export function hexToPixel(hex, size) {
  const x = size * (3 / 2) * hex.x;
  const y = size * Math.sqrt(3) * (hex.y + (hex.x / 2));
  return { x, y };
}

export function getThirdCoord(c1, c2) {
  return (-c1 - c2 === -0) ? 0 : -c1 - c2;
}

// this should probably go into another file maybe for dice or something
export function isSeed(chanceToBeSeed) {
  return (random(1, 100) <= chanceToBeSeed) || false;
}

export function makeTerrainSeed(index) {
  const terrain = sample(terrains.keys);

  return {
    terrain,
    terrainKey: index,
    isSeed: true,
    texture: terrains.textures[terrain],
  };
}

// create a rectangular hexmap with as much inital data in one pass as possible
export function rectangle({ hex, gridColumns, gridRows, hexSize, seedChance }) {
  // array for storing an ordered array of ids to use as a lookup for our hexes object
  const idMap = [];
  const idMapSeeds = [];
  const idMapDirt = [];

  // object containing all hexes keyed by ids stored in order within idMap
  const hexes = {};

  // the top left hex
  const originHex = hex || { x: 0, y: 0, z: 0 };
  const startHex = originHex;

  const initial = startHex.x;

  for (let i = initial; i < initial + gridColumns; i += 1) {
    startHex.x = i;
    startHex.y = Math.ceil((i * -1) / 2);

    for (let j = 0; j < gridRows; j += 1) {
      const x = startHex.x;
      const y = startHex.y + j;
      const z = getThirdCoord(x, y);
      const hexId = `${x},${y},${z}`;
      let seed = {};

      if (isSeed(seedChance)) {
        seed = makeTerrainSeed(idMap.length + 1);
        idMapSeeds.push(hexId);
      } else {
        idMapDirt.push(hexId);
      }

      idMap.push(hexId);

      hexes[hexId] = {
        id: hexId,
        x,
        y,
        z,
        width: hexWidth(hexSize),
        height: hexHeight(hexSize),
        point: hexToPixel({ x, y, z }, hexSize),
        ...seed,
      };
    }
  }

  return {
    idMap,
    idMapSeeds,
    idMapDirt,
    hexes,
  };
}
