import Nino from '../nino/nino';

const config = {
  frames: 60,
  width: 768,
  height: 768,
  backgroundColor: '#374a52',
  events: {
    load: load,
    update: update,
    draw: draw
  }
};

// new Nino(config);


const obj: any = {
  x: 0,
  y: 16,
  spd: 8,
  radius: 16
};

let factor = config.width;

function load() {
  Nino.Load.image({
    key: 'apple',
    src: '../public/assets/apple.png'
  });
  console.log(1);
  
}

function update() {
  if (Nino.Input.getButton('ArrowDown')) {
    obj.y += 8;
  }

  if (Nino.Input.getButton('ArrowUp')) {
    obj.y -= 8;
  }

  // const img: any = Nino.Load.getImage('apple');
  // console.log(img);
}

Nino.Math.randomRange({ min: 5, max: 10 });

function draw() {
  // Nino.Draw.color(Nino.Draw.white);
  Nino.Draw.circle(obj.x, obj.y, obj.radius);

  obj.x = Nino.Math.clamp({
    value: Nino.Math.lerp({
      value1: obj.x,
      value2: factor,
      smooth: 0.05
    }),
    min: 0,
    max: config.width - 64
  });

  if (obj.x >= config.width - 64) {
    factor = -64;
  }

  if (obj.x <= 0) {
    factor = config.width;
  }
}
