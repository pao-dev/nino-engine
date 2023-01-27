import Nino from '../nino/nino';

export default class Player extends Nino!.Entity {
  public sprite: any;
  init() {
    this.sprite = Nino.Load.getImage('apple');
    this.x = 0;
  }
  update(deltaTime: number) {
    // this.x += 2;
  }
  draw() {
    Nino.Draw.image(this.x, 10, this.sprite);
  }
}
