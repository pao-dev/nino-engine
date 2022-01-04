import Nino from "../nino.js";
import Object from "../object.js";
import { loadImage } from "../loader.js";
import Sprite from "../sprite.js";

import Bacteria from "./bacteria.js";

class Game extends Nino {
  bacteria: any;
  bacteriaSprite: unknown;
  constructor(config: any) {
    super(config);
  }

  async preload() {
    this.bacteriaSprite = await loadImage("assets/imgs/bird.png");
    console.log(this.bacteriaSprite);
  }

  create(): void {
    Object.defineGroup("entities");
    this.bacteria = Object.create("entities", Bacteria, {
      position: {
        x: 0,
        y: 0,
      },
    });
    this.bacteria.sprite = new Sprite(this.bacteriaSprite, 0, 0, 64, 64, 1);
    console.log(Object.instances);
  }

  update(deltaTime: number): void {}

  draw(interpolate: number): void {}
}
const game = new Game({
  frames: 60,
  width: 800,
  height: 600,
});

const interpolate = (min: number, max: number, fract: number) =>
  max + (min - max) * fract;
