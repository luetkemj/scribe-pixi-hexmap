import { rectangleData } from './data';
import * as hexMath from '../../src/lib/hexMath';

describe('hexMath Lib', () => {
  describe('hexDirection', () => {
    it('should work', () => {
      expect(hexMath.hexDirection(3)).toEqual({ x: -1, y: 1, z: 0 });
    });
  });

  describe('addHexes', () => {
    it('should work', () => {
      expect(hexMath.addHexes({ x: -1, y: 1, z: 0 }, { x: -1, y: 1, z: 0 }))
        .toEqual({ x: -2, y: 2, z: 0 });
    });
  });

  describe('hexNeighbor', () => {
    it('should work', () => {
      expect(hexMath.hexNeighbor({ x: 0, y: 0, z: 0 }, 1))
        .toEqual({ x: 1, y: 0, z: -1 });
    });
  });

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

  describe('hexToId', () => {
    it('should work', () => {
      expect(hexMath.hexToId({ x: 0, y: 0, z: 0 })).toBe('0,0,0');
    });
  });

  describe('idToHex', () => {
    it('should work', () => {
      expect(hexMath.idToHex('0,0,0')).toEqual({ x: 0, y: 0, z: 0 });
    });
  });
});
