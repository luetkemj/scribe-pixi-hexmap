export default class HexTile extends PIXI.Sprite {
  constructor(texture, hex) {
    super(texture);

    this.hex = hex;

    const point = hex.toPoint();

    this.x = point.x;
    this.y = point.y;
    this.width = hex.width();
    this.height = hex.height();

    this.cursor = 'pointer';
    this.interactive = true;

    this.on('mouseover', () => this.handleMouseover());
    this.on('mouseout', () => this.handleMouseout());
  }

  handleMouseover() {
    this.alpha *= 0.5;
  }

  handleMouseout() {
    this.alpha = 1;
  }
}
