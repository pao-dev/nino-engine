import Input from './input';
import { config } from './interfaces/interfaces';
import Layer from './layer';
import Loader from './loader';
import NinoMath from './math';
import Entity from './entity';
import Timer from './timer';
import Draw from './draw';
import { Screen } from './interfaces/interfaces';

/**
 * Main object of the game engine
 * @module Nino
 */
class Nino {
  public static Load = Loader;
  public static Entity: any = Entity;
  public static Input = Input;
  public static Math = NinoMath;
  public static Layer = Layer;
  public static Draw = Draw;
  public static screen: Screen = { width: 0, height: 0 };

  private static instance: Nino;

  public ctx!: CanvasRenderingContext2D;
  public canvas!: HTMLCanvasElement;
  public backgroundColor!: string | CanvasGradient | CanvasPattern;
  public timer!: Timer;
  public loader!: Loader;
  public layer!: Layer;
  public events: any;

  /**
   * Create the mane engine object
   * @param {config} config The config of the game
   */
  constructor(config: any) {
    if (Nino.instance) {
      return Nino.instance;
    }
    Nino.instance = this;

    // Canvas setup
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas-elements';
    this.canvas.width = config.width;
    this.canvas.height = config.height;
    this.canvas.style.display = 'block';
    this.canvas.style.margin = 'auto';
    this.canvas.style.zIndex = '1';

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.backgroundColor = config.backgroundColor ?? '#374a52';

    Nino.Draw.ctx = this.ctx;

    Nino.screen = {
      width: config.width,
      height: config.height
    };

    // events
    this.events = config.events;

    // Loader
    this.loader = new Loader();

    // loop
    this.timer = new Timer(this.events.update, this.events.draw);

    // Layer
    this.layer = new Layer();

    window.addEventListener('load', () => {
      this.init();
    });
  }

  /**
   * Start the engine process
   *
   * @returns {void}
   */
  private init(): void {
    // Console Message
    console.log(
      '%c Nino.JS v1.3.0 ',
      'color: black; font-weight: 900; background-color: aquamarine'
    );
    // this.loader.preload();
    this.events.load();
    this.loader.mainLoader().then(() => {
      // load init
      const keys = Object.keys(Nino.Entity.entities);
      for (let i = 0; i < keys.length; ++i) {
        const groups = Nino.Entity.entities[keys[i]];
        for (let u = 0; u < groups.length; ++u) {
          groups[u].init();
        }
      }

      document.body.appendChild(this.canvas);

      // Time manager
      this.timer.updateManager = (deltaTime) => this.updateManager(deltaTime);
      this.timer.renderManager = (interpolation) =>
        this.renderManager(interpolation);

      // Input
      Nino.Input.init(this.canvas);

      // timer
      this.timer.init();
    });
  }

  /**
   * The update manager
   *
   * @param {number} delta Delta time
   * @returns {void}
   */
  private updateManager(deltaTime: number): void {
    const keys = Object.keys(Nino.Entity.entities);
    for (let i = 0; i < keys.length; ++i) {
      const groups = Nino.Entity.entities[keys[i]];
      for (let u = 0; u < groups.length; ++u) {
        groups[u].update(deltaTime);
      }
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
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw objects
    const keys = Object.keys(Nino.Entity.entities);
    for (let i = 0; i < keys.length; ++i) {
      const groups = Nino.Entity.entities[keys[i]];
      for (let u = 0; u < groups.length; ++u) {
        groups[u].draw(interpolation);
      }
    }
  }

  public static warning(message: string): null {
    console.warn(message);
    return null;
  }
}

export default Nino;
