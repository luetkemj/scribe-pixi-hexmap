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

export function rectangle({ hex, gridColumns, gridRows, hexSize }) {
  const array = [];
  const object = {};
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

      array.push(`${x},${y},${z}`);
      object[`${x},${y},${z}`] = {
        id: `${x},${y},${z}`,
        x,
        y,
        z,
        width: hexWidth(hexSize),
        height: hexHeight(hexSize),
        point: hexToPixel({ x, y, z }, hexSize),
      };
    }
  }

  return {
    idMap: array,
    hexes: object,
  };
}
