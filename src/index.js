import { each } from 'lodash';
import world, { world2 } from './world/world-test';

import HexTile from './HexTile';

const app = new PIXI.Application({ antialias: true, width: 975 });

const mapDom = document.getElementById('map');
mapDom.appendChild(app.view);

each(world, (hex) => {
  const tile = new HexTile(hex.texture, hex, { showSeeds: false });
  app.stage.addChild(tile);
});

// map 2
const app2 = new PIXI.Application({ antialias: true, width: 1950, height: 1150 });

const mapDom2 = document.getElementById('map2');
mapDom2.appendChild(app2.view);

each(world2, (hex) => {
  const tile = new HexTile(hex.texture, hex, { showSeeds: true });
  app2.stage.addChild(tile);
});
