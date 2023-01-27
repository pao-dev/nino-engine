import Nino from '../nino/nino';
import Entity from '../nino/entity';
import Player from './player';

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
new Nino(config);

Nino.Entity.defineGroup('player');
Nino.Entity.defineGroup('enemies');
Nino.Entity.create('player', Player, {});
Nino.Entity.create('player', Player, {});
Nino.Entity.create('player', Player, {});
Nino.Entity.create('player', Player, {});

function load() {
  Nino.Load.image({
    key: 'apple',
    src: '../public/assets/apple.png'
  });
}

function update() {}

function draw() {}
