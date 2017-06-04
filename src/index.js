import { Grid, HEX_ORIENTATIONS } from 'honeycomb-grid';

const app = new PIXI.Application(1000, 1000, { antialias: true, resolution: 1 });

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

const grid = Grid({
  size: 20,
  orientation: HEX_ORIENTATIONS.FLAT,
});

const hexArray = grid.rectangle({
  width: 30,
  height: 30,
  direction: 1,
});
console.log(hexArray);
console.log(grid);

hexArray.forEach(hex => drawHexagon(grid.hexToPoint(hex), 20));
