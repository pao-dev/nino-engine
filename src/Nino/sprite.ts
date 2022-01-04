export default class Sprite {
  private image: any;
  private sx: number;
  private sy: number;
  private width: number;
  private height: number;
  private scale: number;

  constructor(
    image: any,
    sx: number,
    sy: number,
    width: number,
    height: number,
    scale: number
  ) {
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

  interpolate = (min: number, max: number, fract: number): number =>
    max + (min - max) * fract;

  draw(ctx: any, interpolation: number, position: any) {
    // console.log(interpolation);

    let x = position.lastX + (position.x - position.lastX) * interpolation;
    let y = position.lastY + (position.y - position.lastY) * interpolation;
    // let x = this.interpolate(position.lastX, position.x, interpolation);
    // let y = this.interpolate(position.lastY, position.y, interpolation);

    ctx.drawImage(
      this.image,
      this.sx * this.width,
      this.sy * this.height,
      this.width,
      this.height,
      x,
      y,
      this.width * 1,
      this.height * 1
    );
  }
}
