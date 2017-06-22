import { rectangleData } from './data';
import * as hexMath from '../../src/lib/hexMath';

jest.mock('../../src/textures/terrains.textures', () => ({
  terrains: {
    keys: ['terrain'],
    textures: {
      terrain: 'texture',
    },
  },
}));

describe('hexMath Lib', () => {
  describe('distance', () => {
    it('should work', () => {
      expect(hexMath.distance({ x: 0, y: 0, z: 0 }, { x: 10, y: 10, z: -20 })).toBe(20);
    });
  });

  describe('hexWidth', () => {
    it('should work', () => {
      expect(hexMath.hexWidth(20)).toBe(40);
    });
  });

  describe('hexHeight', () => {
    it('should work', () => {
      expect(hexMath.hexHeight(20)).toBe(34.64101615137754);
    });
  });

  describe('hexToPixel', () => {
    it('should work', () => {
      expect(hexMath.hexToPixel(rectangleData.hexes['3,1,-4'], 20)).toEqual({ x: 90, y: 86.60254037844385 });
    });
  });

  describe('getThirdCoord', () => {
    it('should work', () => {
      expect(hexMath.getThirdCoord(1, 1)).toBe(-2);
    });
  });

  describe('rectangle', () => {
    it('should work without a custom originHex', () => {
      const data = hexMath.rectangle({
        gridColumns: 10,
        gridRows: 10,
        hexSize: 20,
        seedChance: 50,
      });

      console.log(data.idMapDirt.length);
      console.log(data.idMapSeeds.length);
      // console.log(JSON.stringify(data, null, 2));

      expect(data.idMap.length).toBe(100);
      expect(data.idMapDirt.length + data.idMapSeeds.length).toBe(data.idMap.length);
    });

    it('should work with a custom originHex', () => {
      const data = hexMath.rectangle({
        hex: { x: 3, y: 3, z: -6 },
        gridColumns: 2,
        gridRows: 2,
        hexSize: 20,
        seedChance: 50,
      });

      expect(data.idMap.length).toBe(4);
    });
  });
});
