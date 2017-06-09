export default class HexTile extends PIXI.Sprite {
  constructor(texture, hex, config) {
    super(texture);

    this.hex = hex;

    const point = hex.toPoint();

    this.x = point.x;
    this.y = point.y;
    this.width = hex.width();
    this.height = hex.height();

    if (this.hex.isSeed) {
      if (config.showSeeds) {
        this.alpha = 0.6;
      }
    }

    this.cursor = 'pointer';
    this.interactive = true;

    this.on('mouseover', () => this.handleMouseover());
    this.on('mouseout', () => this.handleMouseout());
    this.on('click', () => this.handleClick());
  }

  handleMouseover() {
    this.alpha *= 0.5;
  }

  handleMouseout() {
    this.alpha = 1;
  }

  handleClick() {
    console.log(this.hex);
  }
}
