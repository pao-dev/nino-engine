/**
 * Main vector module
 * @module Vector
 */
export default class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public add(vector: Vector): void {
    this.x += vector.x;
    this.y += vector.y;
  }

  public substract(vector: Vector): void {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  public negate(): void {
    this.x = -this.x;
    this.y = -this.y;
  }

  public multiply(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
  }

  public divide(scalar: number): void {
    this.x /= scalar;
    this.y /= scalar;
  }

  public mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public setMag(scalar: number): void {
    this.normalize();
    this.multiply(scalar);
  }

  public normalize(): void {
    if (this.x != 0 || this.y != 0) {
      const factor: number = 1 / Math.sqrt(this.x * this.x + this.y * this.y);
      this.x = factor * this.x;
      this.y = factor * this.y;
    }
  }

  // public distance(x1: number, y1: number, x2: number, y2: number): number {
  //   const xDistance: number = x2 - x1;
  //   const yDistance: number = y2 - y1;
  //   return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  // }

  public limit(limit: number): void {
    if (this.mag() > limit) {
      this.setMag(limit);
    }
  }

  public copy(vector: Vector): void {
    this.x = vector.x;
    this.y = vector.y;
  }
}
