export default class Draw {
  public static ctx: any;

  static white: string = 'white';
  static black: string = 'black';
  static red: string = 'red';
  static blue: string = 'blue';
  static green: string = 'green';
  static yellow: string = 'yellow';
  static lime: string = 'lime';
  static cyan: string = 'cyan';

  constructor() {}

  static color(color: string): void {
    Draw.ctx.fillStyle = color;
  }

  static rect(x: number, y: number, w: number, h: number): void {
    Draw.ctx.fillRect(x, y, w, h);
  }

  static circle(x: number, y: number, radius: number): void {
    Draw.ctx.beginPath();
    Draw.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    Draw.ctx.fill();
  }

  static image(x: number, y: number, image: any): void {
    Draw.ctx.drawImage(image, x, y);
  }

}