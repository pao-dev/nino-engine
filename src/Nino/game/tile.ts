import Nino from "../nino.js";
import Board from "./board.js";

class Tile extends Nino.Object {
  tileSize: number;
  type: any;
  constructor(properties: any) {
    super(properties);

    this.tileSize = 64;
    this.type = 0;
  }
  create() {}
  defineType(type: number) {
    // console.log(type);
    switch (type) {
      case 1:
        this.type = {
          id: type,
          sprite: "tree-sprite"
        };
        break;

      case 2:
        this.type = {
          id: type,
          sprite: "rock-sprite"
        };
        break;
      default:
        break;
    }
  }
  update(deltaTime: number): void {}

  draw(ctx: CanvasRenderingContext2D, interpolation: number): void {
    if (this.type.sprite != undefined)
      Nino.Load.getSprite(this.type.sprite)?.draw(
        ctx,
        interpolation,
        this.position
      );
  }
}

export default Tile;
