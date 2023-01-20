import Input from './input';
import { config } from './interfaces';
import Layer from './layer';
import Loader from './loader';
import Math2 from './math';
import Instance from './object';
import Timer from './timer';

class Nino {
  public static Load = Loader;
  public static Object = Instance;
  public static Input = Input;
  public static Math = Math2;
  public static Layer = Layer;

  public ctx: CanvasRenderingContext2D;
  public canvas: HTMLCanvasElement;

  public backgroundColor: string | CanvasGradient | CanvasPattern;

  public timer: Timer;
  public loader: Loader;
  public layer: Layer;

  /**
   * Create the mane engine object
   * @param {config} config THe config of the game
   */
  constructor(config: config) {
    // Canvas setup
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas-elements';
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.canvas.style.zIndex = '1';

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.backgroundColor = config.backgroundColor ?? '#374a52';

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
  private init(): void {
    this.loader.preload();
    this.loader.mainLoader().then(() => {
      // Console Message
      console.log(
        '%c Nino.JS v2.0.0 ',
        'color: black; font-weight: 900; background-color: aquamarine'
      );

      // Add canvas to the page
      let e: any = document.getElementById('main-canvas');
      e.appendChild(this.canvas);

      // Time manager
      this.timer.updateManager = (deltaTime) => this.updateManager(deltaTime);
      this.timer.renderManager = (interpolation) =>
        this.renderManager(interpolation);

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
  private updateManager(deltaTime: number) {
    for (let group in Instance.instances) {
      Instance.instances[group].forEach((object: any) => {
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
  private renderManager(interpolation: number): void {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw default background
    // this.ctx.fillStyle = this.backgroundColor;
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw objects

    for (let group in Instance.instances) {
      Instance.instances[group].forEach((object: any) => {
        object.draw(this.ctx, interpolation);
      });
    }
  }

  public setup() {
    throw new Error('Method not implemented.');
  }

  public start(): any {
    this.init();
  }

  public static warning(message: string): null {
    console.warn(message);
    return null;
  }
}

export default Nino;
