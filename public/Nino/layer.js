class Layer {
    constructor() { }
    static create(id, width, height, layer) {
        let canvas = document.createElement("canvas");
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        canvas.style.zIndex = layer.toString();
        Layer.layerBuffer.set(id, canvas);
    }
    static get(id) {
        return Layer.get(id);
    }
}
Layer.layerBuffer = new Map();
export default Layer;
