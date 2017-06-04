const app = new PIXI.Application(800, 600, { antialias: true, resolution: 1 });

document.getElementById('map').appendChild(app.view);

const graphics = new PIXI.Graphics();

function hexCorner(center, size, i) {
  const deg = 60 * i;
  const rad = (Math.PI / 180) * deg;

  return {
    x: center.x + (size * Math.cos(rad)),
    y: center.y + (size * Math.sin(rad)),
  };
}

function drawHexagon(center, size) {
  graphics.beginFill(0x333333);
  graphics.lineStyle(1, 0xFFFFFF, 1);

  let point = hexCorner(center, size, 0);
  graphics.moveTo(point.x, point.y);

  for (let i = 1; i < 7; i += 1) {
    point = hexCorner(center, size, i);
    graphics.lineTo(point.x, point.y);
  }
  app.stage.addChild(graphics);
}

function hexToPixel(hex) {
  const x = hex.size * ((3 / 2) * hex.q);
  const y = hex.size * Math.sqrt(3) * (hex.r + (hex.q / 2));
  return { x, y };
}

// function pixelToHex(x, y, size) {
//   const q = x * 2/3 / size;
//   const r = (-x / 3 + Math.sqrt(3) / 3 * y) / size
//   return {q, r};
// }

const hexArray = [
  { size: 20, q: 2, r: 1, s: -3 },
  { size: 20, q: 2, r: 2, s: -4 },
  { size: 20, q: 3, r: 0, s: -3 },
  { size: 20, q: 3, r: 1, s: -4 },
  { size: 20, q: 3, r: 2, s: -5 },
  { size: 20, q: 4, r: 0, s: -4 },
  { size: 20, q: 4, r: 1, s: -5 },
];

hexArray.forEach(hex => drawHexagon(hexToPixel(hex), hex.size));
