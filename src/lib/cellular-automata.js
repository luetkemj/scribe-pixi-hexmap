import { cloneDeep, each, random } from 'lodash';
import * as hexMath from './hexMath';
import * as hexMap from './hexMap';
import { terrains } from '../textures/terrains.textures';

function chance(percent) {
  return (random(1, 100) <= percent) || false;
}

export function mutate(hex, hexes) {
  let walls = 0;
  const threshold = hex.terrain === 'mountains' ? 3 : 4;
  const neighbors = hexMath.hexNeighbors(hex);
  let updatedHex;

  each(neighbors, (neighbor) => {
    const hexId = hexMath.hexToId(neighbor);
    if (hexes[hexId] && hexes[hexId].terrain === 'mountains') {
      walls += 1;
    }

    if (walls > threshold) {
      updatedHex = Object.assign({}, cloneDeep(hex), {
        terrain: 'mountains',
        texture: terrains.textures.mountains,
      });

      return false;
    }

    return true;
  });

  return updatedHex;
}

export function cellularAutomata({
  hex,
  gridColumns,
  gridRows,
  hexSize,
  iterations,
  percentOpen,
}) {
  // array for storing an ordered array of ids to use as a lookup for our hexes object
  const idMap = [];
  const idMapSeeds = [];
  const idMapDirt = [];
  const idMapTerrainKeys = {};

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
      const z = hexMath.getThirdCoord(x, y);
      const hexId = `${x},${y},${z}`;
      idMap.push(hexId);

      const terrain = chance(percentOpen) ? 'water' : 'mountains';

      hexes[hexId] = {
        id: hexId,
        x,
        y,
        z,
        width: hexMath.hexWidth(hexSize),
        height: hexMath.hexHeight(hexSize),
        point: hexMath.hexToPixel({ x, y, z }, hexSize),
        terrain,
        texture: terrains.textures[terrain],
      };
    }
  }

  for (let i = 0; i < iterations; i += 1) {
    each(idMap, (hexId) => {
      mutate(hexes[hexId], hexes);
    });
  }

  const idMapBoundaries = hexMap.mapBoundaries(hex || { x: 0, y: 0, z: 0 },
    gridColumns, gridRows, hexes);

  each(idMapBoundaries, (hexId) => {
    hexes[hexId].terrain = 'mountains';
    hexes[hexId].texture = terrains.textures.mountains;
  });

  return {
    idMap,
    idMapBoundaries,
    idMapDirt,
    idMapSeeds,
    idMapTerrainKeys,
    hexes,
  };
}
