import world from './world/world';

import HexTile from './HexTile';

const app = new PIXI.Application({
  width: window.outerWidth,
  height: window.outerHeight,
  antialias: true,
});

const mapDom = document.getElementById('map');
mapDom.appendChild(app.view);

world.forEach((hex) => {
  const tile = new HexTile(hex.texture, hex);
  app.stage.addChild(tile);
});
