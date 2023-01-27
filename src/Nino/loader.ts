import { imageSettings, spriteSettings } from './interfaces/interfaces';
import Nino from './nino';
import Sprite from './sprite';

/**
 * Main loaer handler module
 * @module Loader
 */
export default class Loader {
  private static imageBuffer: Map<string, any>;
  private static spriteBuffer: Map<string, any>;

  constructor() {
    Loader.imageBuffer = new Map();
    Loader.spriteBuffer = new Map();
  }
  /**
   * The main loader function
   *
   * @returns {Promise<any>}
   */
  public async mainLoader(): Promise<any> {
    for (const [key, value] of Loader.imageBuffer.entries()) {
      let _img = await Loader.loadImage(value);
      Loader.imageBuffer.set(key, _img);
    }
    // sprites
    for (const [key, value] of Loader.spriteBuffer.entries()) {
      let _img = await Loader.loadImage(value.src);

      let _sprite = new Sprite(
        _img,
        value.x,
        value.y,
        value.w,
        value.h,
        value.s
      );

      Loader.spriteBuffer.set(key, _sprite);
    }
  }
  preload(): any {}

  /**
   * Load Image
   *
   * @param {string} url Image path
   * @returns {Promise<HTMLImageElement>}
   */
  public static loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image();

      image.addEventListener('load', () => resolve(image));

      image.src = url;
    });
  }

  /**
   * Load Image
   *
   * @param param Image settings
   * @returns  {void}
   */
  public static image(param: imageSettings): void | null {
    const { key, src } = param;

    if (Loader.imageBuffer.has(key))
      return Nino.warning(`The identifier "${key}" already exists`);

    Loader.imageBuffer.set(key, src);
  }

  /**
   * Get image
   *
   * @param {string} key The image identifier
   * @returns
   */
  public static getImage(key: string): Sprite | null {
    let image = Loader.imageBuffer.get(key);

    if (!image)
      return Nino.warning(`The identifier "${key}" does not match any element`);

    return image;
  }

  /**
   * Load sprite
   *
   * @param {spriteSettings} param Sprite settings
   * @returns {void}
   */
  public static sprite(param: spriteSettings): void | null {
    const {
      key,
      src,
      config: { x, y, width, height, scale }
    } = param;

    if (Loader.spriteBuffer.has(key))
      return Nino.warning(`The identifier "${key}" already exists`);

    Loader.spriteBuffer.set(key, { src, x, y, w: width, h: height, s: scale });
  }

  /**
   * Get sprite
   *
   * @param {string} key The sprite identifier
   * @returns
   */
  public static getSprite(key: string): Sprite | null {
    let sprite = Loader.spriteBuffer.get(key);

    if (!sprite)
      return Nino.warning(`The identifier "${key}" does not match any element`);

    return sprite;
  }
}