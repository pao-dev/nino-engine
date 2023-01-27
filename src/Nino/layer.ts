export default class Layer {
  public static layerBuffer: any = new Map();
  constructor() {}
  public static create(
    id: string,
    width: number,
    height: number,
    layer: number
  ) {
    let canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.style.zIndex = layer.toString();

    Layer.layerBuffer.set(id, canvas);
  }
  public static get(id: string): any {
    return Layer.get(id);
  }
}