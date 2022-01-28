import Nino from "../nino.js";
class Tile extends Nino.Object {
    constructor(properties) {
        super(properties);
        this.tileSize = 64;
        this.type = 0;
    }
    create() { }
    defineType(type) {
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
    update(deltaTime) { }
    draw(ctx, interpolation) {
        if (this.type.sprite != undefined)
            Nino.Load.getSprite(this.type.sprite)?.draw(ctx, interpolation, this.position);
    }
}
export default Tile;
