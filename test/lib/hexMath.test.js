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
        gridColumns: 6,
        gridRows: 4,
        hexSize: 20,
        seedChance: 50,
      });

      expect(data.idMap.length).toBe(24);
      // console.log(JSON.stringify(data, null, 2));
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
