import * as hexMap from '../../src/lib/hexMap';

jest.mock('../../src/textures/terrains.textures', () => ({
  terrains: {
    keys: ['terrain'],
    textures: {
      terrain: 'texture',
    },
  },
}));

describe('hexMap Lib', () => {
  describe('mapBoundary', () => {
    it('should work for rows', () => {
      expect(hexMap.mapBoundary({ x: 0, y: 0, z: 0 }, 5, false)).toEqual([
        '0,0,0',
        '1,0,-1',
        '2,-1,-1',
        '3,-1,-2',
        '4,-2,-2',
      ]);
    });

    it('should work for colums', () => {
      expect(hexMap.mapBoundary({ x: 0, y: 0, z: 0 }, 5, true)).toEqual([
        '0,0,0',
        '0,1,-1',
        '0,2,-2',
        '0,3,-3',
        '0,4,-4',
      ]);
    });

    it('should work with any originHex', () => {
      expect(hexMap.mapBoundary({ x: 31, y: -15, z: -16 }, 5, true)).toEqual([
        '31,-15,-16',
        '31,-14,-17',
        '31,-13,-18',
        '31,-12,-19',
        '31,-11,-20',
      ]);
    });
  });

  describe('mapBoundaries', () => {
    it('should work', () => {
      expect(hexMap.mapBoundaries({ x: 0, y: 0, z: 0 }, 5, 5)).toEqual([
        '0,0,0',
        '1,0,-1',
        '2,-1,-1',
        '3,-1,-2',
        '4,-2,-2',
        '4,-1,-3',
        '4,0,-4',
        '4,1,-5',
        '4,2,-6',
        '0,1,-1',
        '0,2,-2',
        '0,3,-3',
        '0,4,-4',
        '1,4,-5',
        '2,3,-5',
        '3,3,-6',
      ]);
    });
  });

// @TODO
// mock the internal functions here - tests are too fragile at the moment
  describe('rectangle', () => {
    it('should work without a custom originHex', () => {
      const data = hexMap.rectangle({
        gridColumns: 10,
        gridRows: 10,
        hexSize: 20,
        seedChance: 50,
        seedChanceRatios: [
          { hills: 0 },
        ],
      });

      // console.log(data.idMapDirt.length);
      // console.log(data.idMapSeeds.length);
      // console.log(data.idMapBoundaries.length);
      // console.log(JSON.stringify(data, null, 2));

      expect(data.idMap.length).toBe(100);
      expect(data.idMapBoundaries.length).toBe(36);
      expect(data.idMapDirt.length + data.idMapSeeds.length).toBe(data.idMap.length);
    });

    it('should work with a custom originHex', () => {
      const data = hexMap.rectangle({
        hex: { x: 3, y: 3, z: -6 },
        gridColumns: 2,
        gridRows: 2,
        hexSize: 20,
        seedChance: 50,
        seedChanceRatios: [
          { hills: 0 },
        ],
      });

      expect(data.idMap.length).toBe(4);
    });
  });
});
