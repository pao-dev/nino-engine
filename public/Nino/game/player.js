import Nino from "../nino.js";
class Player extends Nino.Object {
    constructor(properties) {
        super(properties);
        this.number = 0;
    }
    update(deltaTime) { }
    draw(ctx, interpolation) {
        let n = this.number == 0 ? "P1-sprite" : "P2-sprite";
        Nino.Load.getSprite(n)?.draw(ctx, interpolation, this.position);
    }
}
export default Player;
