import Object from "./object.js";

class Nino {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private fps: number;
  private frameDuration: number;
  private prevTime: number;
  private accumulatedFrameTime: number;
  private fpsCount: number;

  /**
   * Create the mane engine object
   * @param {config} config THe config of the game
   */
  constructor(config: config) {
    // Canvas setup
    this.canvas = document.createElement("canvas");
    this.canvas.id = "nino-canvas";
    this.canvas.width = config.width;
    this.canvas.height = config.height;

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    // Main loop
    this.fps = config.frames;
    this.frameDuration = 1000 / this.fps;
    this.prevTime = performance.now();
    this.accumulatedFrameTime = 0;
    this.fpsCount = 0;

    this.init();
  }

  /**
   * Start the engine process
   *
   * @returns {void}
   */
  init(): void {
    this.preload().then(() => {
      // Nino Message
      console.log(
        "%c Nino.JS v2.0.0 ",
        "color: black; font-weight: 900; background-color: aquamarine"
      );

      // Create Canvas
      document.body.appendChild(this.canvas);

      // Start main loop
      window.requestAnimationFrame((timeStamp) => {
        this.loop(timeStamp);
      });

      // Start object start methed
      this.create();
    });
  }

  /**
   * Main Loop
   *
   * @param {number} time Keep track of the time
   * @returns {void}
   */
  loop(time: number): void {
    const elapsedTimeBetweenFrames = time - this.prevTime;
    this.prevTime = time;
    this.accumulatedFrameTime += elapsedTimeBetweenFrames;

    let numberOfUpdates = 0;

    while (this.accumulatedFrameTime >= this.frameDuration) {
      this.updateManager(this.frameDuration);
      this.accumulatedFrameTime -= this.frameDuration;

      // sanity check
      if (numberOfUpdates++ >= 200) {
        this.accumulatedFrameTime = 0;
        console.log("restore");
        // restoreTheGameState();
        break;
      }
    }

    this.fpsCount = Math.round(1 / (elapsedTimeBetweenFrames / 1000));

    // this is a percentage of time
    const interpolate = this.accumulatedFrameTime / this.frameDuration;
    this.render(interpolate);

    window.requestAnimationFrame((timeStamp) => {
      this.loop(timeStamp);
    });
  }

  /**
   * The update manager
   *
   * @param {number} delta Delta time
   * @returns {void}
   */
  updateManager(delta: number) {
    for (let group in Object.instances) {
      Object.instances[group].forEach((object: any) => {
        object.update(this.frameDuration);
      });
    }
  }

  /**
   * Main Render Method
   *
   * @param {number} interpolation The interpolate value
   * @returns {void}
   */
  render(interpolation: number): void {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw default background
    this.ctx.fillStyle = "#374a52";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the game objects
    for (let group in Object.instances) {
      Object.instances[group].forEach((object: any) => {
        object.draw(this.ctx, interpolation);
      });
    }
  }

  preload(): any {}
  create(): void {}
}

interface config {
  frames: number;
  width: number;
  height: number;
}

export default Nino;
