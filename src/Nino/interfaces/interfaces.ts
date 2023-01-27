export interface config {
  frames: number;
  width: number;
  height: number;
  backgroundColor: string;
}

export interface spriteSettings {
  key: string;
  src: string;
  config: {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
  };
}

export interface Screen {
  width: number;
  height: number
}

export interface Clamp {
  value: number;
  min: number;
  max: number;
}

export interface Lerp {
  value1: number;
  value2: number;
  smooth: number;
}

export interface Map {
  value: number;
  min1: number;
  max1: number;
  min2: number;
  max2: number;
}

export interface Range {
  min: number;
  max: number;
}

export interface imageSettings {
  key: string;
  src: string;
}

export interface position {
  x: number;
  y: number;
}
