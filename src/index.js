import { each } from 'lodash';
import world from './world/world-test';

import HexTile from './HexTile';

const app = new PIXI.Application({ antialias: true, width: 975 });

const mapDom = document.getElementById('map');
mapDom.appendChild(app.view);

const config = {
  showTerrainKeys: false,
  showSeeds: false,
  showBoundaries: false,
};

const styleTerrainKey = new PIXI.TextStyle({
  fontSize: 12,
  fill: '#FFFFFF',
});

each(world, (hex) => {
  // add hexTile
  const tile = new HexTile(hex.texture, hex, {
    showSeeds: config.showSeeds,
    showBoundaries: config.showBoundaries,
  });
  app.stage.addChild(tile);

  // add hexTerrainKeys
  const terrainKey = new PIXI.Text(hex.terrainKey, styleTerrainKey);
  terrainKey.x = hex.point.x + 10;
  terrainKey.y = hex.point.y + 10;
  if (config.showTerrainKeys) {
    app.stage.addChild(terrainKey);
  }
});
