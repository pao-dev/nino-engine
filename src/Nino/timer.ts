class Timer {
  private fps: number;
  private frameDuration: number;
  private prevTime: number;
  private accumulatedFrameTime: number;

  constructor() {
    // this.fps = 60;
    this.fps = 30;
    this.frameDuration = 1000 / this.fps;
    this.prevTime = performance.now();
    this.accumulatedFrameTime = 0;

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
  mainLoop(time: number): void {
    const elapsedTimeBetweenFrames = time - this.prevTime;
    this.prevTime = time;
    this.accumulatedFrameTime += elapsedTimeBetweenFrames;

    let numberOfUpdates = 0;

    while (this.accumulatedFrameTime >= this.frameDuration) {
      this.update(this.frameDuration);
      this.updateManager(this.frameDuration);
      this.accumulatedFrameTime -= this.frameDuration;

      // do a sanity check
      if (numberOfUpdates++ >= 200) {
        this.accumulatedFrameTime = 0;
        // restoreTheGameState();
        break;
      }
    }

    // this is a percentage of time
    const interpolate = this.accumulatedFrameTime / this.frameDuration;
    this.renderManager(interpolate);
    this.render(interpolate);

    window.requestAnimationFrame((_time) => {
      this.mainLoop(_time);
    });
  }

  updateManager(deltaTime: number): void {}
  update(deltaTime: number): void {}
  renderManager(interpolation: number): void {}
  render(interpolation: number): void {}
}

export default Timer;
