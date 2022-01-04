export default class Object {
  public static instances: any = {};
  public static blocks = [];
  public static idCount = 0;

  public position: any;

  private id: number;
  private mask: any;
  private sprite: any;

  constructor(properties: any) {
    const { id, position } = properties;

    this.id = id;

    this.position = position;

    // this.sprite = {
    // 	width: undefined,
    // 	height: undefined
    // };

    this.mask = {
      width: undefined,
      height: undefined,
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
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  static defineGroup(groupName: string) {
    Object.instances[groupName] = [];
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
      id: this.idGenerator(),
      position: properties.position,
    });
    // Push the object into the array

    Object.instances[group].push(obj);

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
    for (const [index, element] of Object.instances.entries()) {
      if (element.id === object.id) {
        Object.instances.splice(index, 1);
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
  drawSprite(
    ctx: CanvasRenderingContext2D,
    interpolation: number,
    xOffset: number = 0,
    yOffset: number = 0
  ) {
    this.sprite.draw(ctx, interpolation, this.position);
  }
}
