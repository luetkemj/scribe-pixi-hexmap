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

each(world.data, (hex) => {
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

let dragEaseTimer = null;
function dragEase(vel) {
  let stepX = vel.x / 10;
  let stepY = vel.y / 10;
  let count = 0.1;

  dragEaseTimer = setInterval(() => {
    stepX *= 0.9;
    stepY *= 0.9;
    app.stage.x += stepX;
    app.stage.y += stepY;
    count += 1;

    if (count >= 1000) {
      clearInterval(dragEaseTimer);
    }
  }, 10);
}

// drag map
let draggingStage = false;

function onDragStart() {
  draggingStage = true;
}

function onDragEnd() {
  draggingStage = false;
  dragEase({
    x: app.renderer.plugins.interaction.mouse.originalEvent.movementX,
    y: app.renderer.plugins.interaction.mouse.originalEvent.movementY,
  });
}

function onDragMove() {
  if (draggingStage) {
    const movementX = app.renderer.plugins.interaction.mouse.originalEvent.movementX;
    const movementY = app.renderer.plugins.interaction.mouse.originalEvent.movementY;
    const maxX = 0;
    const maxY = 0;
    const minX = world.width * -1;
    const minY = (world.height * -1) + 550;

    if (this.x + movementX > maxX) {
      this.x = maxX;
    } else {
      this.x += movementX;
    }

    if (this.x + movementX < minX) {
      this.x = minX;
    } else {
      this.x += movementX;
    }

    if (this.y + movementY > maxY) {
      this.y = maxY;
    } else {
      this.y += movementY;
    }

    if (this.y + movementY < minY) {
      this.y = minY;
    } else {
      this.y += movementY;
    }
  }
}

app.stage.interactive = true;
app.stage.on('pointerdown', onDragStart)
         .on('pointerup', onDragEnd)
         .on('pointerupoutside', onDragEnd)
         .on('pointermove', onDragMove);
