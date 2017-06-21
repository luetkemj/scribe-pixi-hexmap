import { rectangleData, rectangleDataCustomOriginHex } from './data';
import * as hexMath from '../../src/lib/hexMath';

describe('hexMath Lib', () => {
  describe('getThirdCoord', () => {
    it('should work', () => {
      expect(hexMath.getThirdCoord(1, 1)).toBe(-2);
    });
  });

  describe('rectangle', () => {
    it('should work without a custom originHex', () => {
      expect(hexMath.rectangle({ width: 6, height: 4 })).toEqual(rectangleData);
    });

    it('should work with a custom originHex', () => {
      expect(hexMath.rectangle({
        hex: { x: 3, y: 3, z: -6 },
        width: 2,
        height: 2,
      })).toEqual(rectangleDataCustomOriginHex);
    });
  });
});
