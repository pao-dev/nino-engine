class Math2 {
  constructor() {}
  public static shuffle(array: []): [] {
    let arr: [] = array;
    for (var i = arr.length - 1; i > 0; --i) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  public static randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
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
  public static shuffle2dArray(array: any) {
    for (var y = 0; y < array.length; ++y) {
      for (var x = 0; x < array[y].length; ++x) {
        let yy = Math.floor(Math.random() * array.length);
        let xx = Math.floor(Math.random() * array.length);

        let temp = array[y][x];
        array[y][x] = array[yy][xx];
        array[yy][xx] = temp;
      }
    }
  }
  public static getPosition(xpos: number, ypos: number) {
    return { x: xpos, y: ypos };
  }
}

export default Math2;
