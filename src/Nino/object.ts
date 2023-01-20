import { position } from './interfaces';
import Sprite from './sprite';

export default class Instance {
  public static instances: any = {};

  public position: position;

  private id: number;
  private mask: any;

  constructor(properties: any) {
    const { id, position, sprite } = properties;

    this.id = id;
    this.position = position;

    this.mask = {
      width: undefined,
      height: undefined
    };

    // Llamar funcion create
    this.create();
  }
  create() {}

  /**
   * * Generate an unique id
   *
   * @return {string}
   */
  static idGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static defineGroup(groupName: string) {
    Instance.instances[groupName] = [];
  }

  static getGroup(groupName: string) {
    return Instance.instances[groupName];
  }

  /**
   * * Create an object
   *
   * @param {object} object
   * @param {position} object
   * @return {object}
   */
  static create(group: string, object: any, properties: any) {
    const obj = new object({
      id: Instance.idGenerator(),
      position: properties.position,
      sprite: properties.sprite
    });

    // Push the object into the array
    Instance.instances[group].push(obj);

    return obj;
  }

  /**
   * * Destroy an object
   *
   * @param {object} object
   *
   * @return {void}
   */
  static destroy(object: any) {
    for (const [index, element] of Instance.instances.entries()) {
      if (element.id === object.id) {
        Instance.instances.splice(index, 1);
        break;
      }
    }
  }

  // // Draw Collisions
  // drawMask(ctx, color) {
  //   ctx.strokeStyle = color;
  //   ctx.beginPath();
  //   ctx.rect(
  //     this.position.x * Nino.Scene.scale + Nino.Scene.xOffset,
  //     this.position.y * Nino.Scene.scale + Nino.Scene.yOffset,
  //     this.mask.width * Nino.Scene.scale,
  //     this.mask.height * Nino.Scene.scale
  //   );
  //   ctx.stroke();
  // }

  // Dibujar sprite
  // drawSprite(
  //   ctx: CanvasRenderingContext2D,
  //   interpolation: number,
  //   xOffset: number = 0,
  //   yOffset: number = 0
  // ) {
  //   this.sprite.draw(ctx, interpolation, this.position);
  // }
}
