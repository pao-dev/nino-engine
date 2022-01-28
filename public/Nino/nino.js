import Input from "./input.js";
import Layer from "./layer.js";
import Loader from "./loader.js";
import Math2 from "./math.js";
import Object from "./object.js";
import Timer from "./timer.js";
class Nino {
    /**
     * Create the mane engine object
     * @param {config} config THe config of the game
     */
    constructor(config) {
        // Canvas setup
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas-elements";
        this.canvas.width = config.width;
        this.canvas.height = config.height;
        this.canvas.style.zIndex = "1";
        this.ctx = this.canvas.getContext("2d");
        this.backgroundColor = config.backgroundColor ?? "#374a52";
        // Loader
        this.loader = new Loader();
        // loop
        this.timer = new Timer();
        // Layer
        this.layer = new Layer();
    }
    /**
     * Start the engine process
     *
     * @returns {void}
     */
    init() {
        this.loader.preload();
        this.loader.mainLoader().then(() => {
            // Console Message
            console.log("%c Nino.JS v2.0.0 ", "color: black; font-weight: 900; background-color: aquamarine");
            // Add canvas to the page
            let e = document.getElementById("main-canvas");
            e.appendChild(this.canvas);
            // Time manager
            this.timer.updateManager = (deltaTime) => this.updateManager(deltaTime);
            this.timer.renderManager = (interpolation) => this.renderManager(interpolation);
            // Input
            Nino.Input.init(this.canvas);
            // Start object start methed
            this.setup();
        });
    }
    /**
     * The update manager
     *
     * @param {number} delta Delta time
     * @returns {void}
     */
    updateManager(deltaTime) {
        for (let group in Object.instances) {
            Object.instances[group].forEach((object) => {
                object.update(deltaTime);
            });
        }
    }
    /**
     * Main Render Method
     *
     * @param {number} interpolation The interpolate value
     * @returns {void}
     */
    renderManager(interpolation) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw default background
        // this.ctx.fillStyle = this.backgroundColor;
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // draw objects
        for (let group in Object.instances) {
            Object.instances[group].forEach((object) => {
                object.draw(this.ctx, interpolation);
            });
        }
    }
    setup() {
        throw new Error("Method not implemented.");
    }
    start() {
        this.init();
    }
    static warning(message) {
        console.warn(message);
        return null;
    }
}
Nino.Load = Loader;
Nino.Object = Object;
Nino.Input = Input;
Nino.Math = Math2;
Nino.Layer = Layer;
export default Nino;
