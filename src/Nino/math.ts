import { Range, Clamp, Map, Lerp } from './interfaces/interfaces';

/**
 * Main math module
 * @module NinoMath
 */
export default class NinoMath {
  private constructor() {}

  public static shuffle(value: any[]): any[] {
    const array: any[] = [...value];
    for (let i: number = array.length - 1; i > 0; --i) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  public static randomRange(params: Range): number {
    const { min, max } = params;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static lerp(params: Lerp): number {
    const { value1, value2, smooth } = params;
    return (1 - smooth) * value1 + smooth * value2;
  }

  public static clamp(params: Clamp): number {
    const { value, min, max } = params;
    return Math.min(Math.max(value, min), max);
  }

  public static map(params: Map): number {
    const { value, min1, max1, min2, max2 } = params;
    const mapped: number =
      ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
    return this.clamp({ value: mapped, min: min2, max: max2 });
  }

  //
  public static matrix2d(width: number, height: number, value: any) {
    const arr: any = [];
    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        arr[y] = [];
      }
    }
    if (value != undefined) {
      for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
          arr[y][x] = value;
        }
      }
    }
    return arr;
  }

  //
  public static shuffle2dArray(array: any) {
    for (var y = 0; y < array.length; ++y) {
      for (var x = 0; x < array[y].length; ++x) {
        const yy: number = Math.floor(Math.random() * array.length);
        const xx: number = Math.floor(Math.random() * array.length);

        const temp = array[y][x];
        array[y][x] = array[yy][xx];
        array[yy][xx] = temp;
      }
    }
  }
}
