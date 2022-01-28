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

export interface imageSettings {
  key: string;
  src: string;
}

export interface position {
  x: number;
  y: number;
}
