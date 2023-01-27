/**
 * Main loop module
 * @module Timer
 */
export default class Timer {
  private fps: number;
  private frameDuration: number;
  private prevTime: number;
  private accumulatedFrameTime: number;
  private eventTimer: any;
  private eventRender: any;

  constructor(eventTimer: any, eventRender: any) {
    this.eventTimer = eventTimer;
    this.eventRender = eventRender;
    this.fps = 30;
    this.frameDuration = 1000 / this.fps;
    this.prevTime = performance.now();
    this.accumulatedFrameTime = 0;
  }

  /**
   * Starts the timer
   * 
   * @returns {void}
   */
  public init(): void {
    window.requestAnimationFrame((_time) => {
      this.mainLoop(_time);
    });
  }

  /**
   * Main Loop
   *
   * @param {number} timestamp Keep track of the time
   * @returns {void}
   */
  private mainLoop(time: number): void {
    const elapsedTimeBetweenFrames: number = time - this.prevTime;
    this.prevTime = time;
    this.accumulatedFrameTime += elapsedTimeBetweenFrames;

    let numberOfUpdates: number = 0;

    while (this.accumulatedFrameTime >= this.frameDuration) {
      this.eventTimer(this.frameDuration);
      this.updateManager(this.frameDuration);
      this.accumulatedFrameTime -= this.frameDuration;

      // Sanity check
      if (numberOfUpdates++ >= 200) {
        this.accumulatedFrameTime = 0;
        break;
      }
    }

    const interpolate: number = this.accumulatedFrameTime / this.frameDuration;
    this.renderManager(interpolate);
    this.eventRender(interpolate);

    window.requestAnimationFrame((_time) => {
      this.mainLoop(_time);
    });
  }

  public updateManager(deltaTime: number): void {}
  public renderManager(interpolation: number): void {}
}