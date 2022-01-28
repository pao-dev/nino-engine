import Nino from "../nino.js";

class Player extends Nino.Object {
  public number: number = 0;
  constructor(properties: any) {
    super(properties);
  }
  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D, interpolation: number): void {
    let n = this.number == 0 ? "P1-sprite" : "P2-sprite";
    Nino.Load.getSprite(n)?.draw(ctx, interpolation, this.position);
  }
}
export default Player;
