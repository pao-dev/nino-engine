export default class Sprite {
    constructor(image, sx, sy, width, height, scale) {
        // Imagen del sprite
        this.image = image;
        // Coordinates in the image
        this.sx = sx;
        this.sy = sy;
        // Image dimensions
        this.width = width;
        this.height = height;
        // Scale
        this.scale = scale;
    }
    draw(ctx, interpolation, position) {
        let x = position.x;
        let y = position.y;
        // let x = position.lastX + (position.x - position.lastX) * interpolation;
        // let y = position.lastY + (position.y - position.lastY) * interpolation;
        ctx.drawImage(this.image, this.sx * this.width, this.sy * this.height, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale);
    }
}
