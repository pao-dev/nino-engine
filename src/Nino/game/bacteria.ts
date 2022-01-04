import Object from "../object.js";

class Bacteria extends Object {
  public speed: number;
  constructor(properties: any) {
    super(properties);
    this.speed = 0.2;

    this.position.lastX = this.position.x;
    this.position.lastY = this.position.y;
  }
  update(deltaTime: number): void {
    this.position.lastX = this.position.x;
    this.position.lastY = this.position.y;

    this.position.x += this.speed * deltaTime;
    if (this.position.x > 600) this.position.x = 0;
  }
  draw(ctx: CanvasRenderingContext2D, interpolation: number): void {
    this.drawSprite(ctx, interpolation, 0, 0);
  }
}

export default Bacteria;
