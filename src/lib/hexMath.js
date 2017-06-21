export function getThirdCoord(c1, c2) {
  return (-c1 - c2 === -0) ? 0 : -c1 - c2;
}

export function rectangle({ hex, width, height }) {
  const array = [];
  const object = {};
  const originHex = hex || { x: 0, y: 0, z: 0 };
  const startHex = originHex;

  const initial = startHex.x;

  for (let i = initial; i < initial + width; i += 1) {
    startHex.x = i;
    startHex.y = Math.ceil((i * -1) / 2);

    for (let j = 0; j < height; j += 1) {
      const x = startHex.x;
      const y = startHex.y + j;
      const z = getThirdCoord(x, y);

      array.push(`${x},${y},${z}`);
      object[`${x},${y},${z}`] = {
        id: `${x},${y},${z}`,
        x,
        y,
        z,
      };
    }
  }

  return {
    idMap: array,
    hexes: object,
  };
}
