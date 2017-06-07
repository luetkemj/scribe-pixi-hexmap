import { Grid, HEX_ORIENTATIONS } from 'honeycomb-grid';
import { sample } from 'lodash';

import HexTile from './HexTile';

const app = new PIXI.Application({
  width: window.outerWidth,
  height: window.outerHeight,
  antialias: true,
});

const mapDom = document.getElementById('map');
mapDom.appendChild(app.view);

const textures = {
  coast: new PIXI.Texture.fromImage('./assets/sprites/hexes/coast.png'),
  desert: new PIXI.Texture.fromImage('./assets/sprites/hexes/desert.png'),
  forest: new PIXI.Texture.fromImage('./assets/sprites/hexes/forest.png'),
  hills: new PIXI.Texture.fromImage('./assets/sprites/hexes/hills.png'),
  mountains: new PIXI.Texture.fromImage('./assets/sprites/hexes/mountains.png'),
  plains: new PIXI.Texture.fromImage('./assets/sprites/hexes/plains.png'),
  swamp: new PIXI.Texture.fromImage('./assets/sprites/hexes/swamp.png'),
};

const grid = Grid({
  size: 20,
  orientation: HEX_ORIENTATIONS.FLAT,
});

const hexArray = grid.rectangle({
  width: 200,
  height: 200,
  direction: 1,
});

hexArray.forEach((hex) => {
  const tile = new HexTile(sample(textures), hex);
  app.stage.addChild(tile);
});

// now that the stage is set we can do things with it
const minX = (app.stage.width - window.outerWidth) * -1;
const minY = (app.stage.height - window.outerHeight) * -1;

function handleMouseWheel(event) {
  if ((app.stage.x + event.deltaX) < minX) {
    app.stage.x = minX;
  } else if ((app.stage.x + event.deltaX) > 0) {
    app.stage.x = 0;
  } else {
    app.stage.x += event.deltaX;
  }

  if ((app.stage.y + event.deltaY) < minY) {
    app.stage.y = minY;
  } else if ((app.stage.y + event.deltaY) > 0) {
    app.stage.y = 0;
  } else {
    app.stage.y += event.deltaY;
  }
}

mapDom.addEventListener('mousewheel', handleMouseWheel, false);
