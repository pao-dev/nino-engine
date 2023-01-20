(() => {
  'use strict';
  var e = {
    d: (t, s) => {
      for (var a in s)
        e.o(s, a) &&
          !e.o(t, a) &&
          Object.defineProperty(t, a, { enumerable: !0, get: s[a] });
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
  };
  e.d({}, { Z: () => m });
  class t {
    constructor() {}
    static init(e) {
      ['keydown', 'keyup'].forEach((e) => {
        window.addEventListener(e, (e) => {
          t.eventHandler(e);
        });
      }),
        ['mousedown', 'mouseup'].forEach((e) => {
          window.addEventListener(e, (e) => {
            t.eventHandlerMouse(e);
          });
        }),
        document.addEventListener('mousemove', (s) => {
          var a = e.getBoundingClientRect();
          (t.mouseX = Math.round(s.clientX - a.left)),
            (t.mouseY = Math.round(s.clientY - a.top));
        });
    }
    static getButtonPress(e) {
      return (
        !(!t.keyMap.get(e) || t.pressed.get(e)) && (t.pressed.set(e, !0), !0)
      );
    }
    static getButton(e) {
      return t.keyMap.get(e);
    }
    static eventHandler(e) {
      e.preventDefault();
      const s = { key: e.key, state: 'keydown' === e.type ? 1 : 0 };
      t.keyMap.get(s.key) !== s.state &&
        (s.state || t.pressed.set(s.key, !1), t.keyMap.set(s.key, s.state));
    }
    static getClickPress(e) {
      return (
        !(!t.mouseMap.get(e) || t.mousePressed.get(e)) &&
        (t.mousePressed.set(e, !0), !0)
      );
    }
    static eventHandlerMouse(e) {
      e.preventDefault();
      const s = { key: 'b', state: 'mousedown' === e.type ? 1 : 0 };
      t.mouseMap.get(s.key) !== s.state &&
        (s.state || t.mousePressed.set(s.key, !1),
        t.mouseMap.set(s.key, s.state));
    }
    static hover(e, s) {
      return (
        e.x < t.mouseX &&
        e.x + s > t.mouseX &&
        e.y < t.mouseY &&
        e.y + s > t.mouseY
      );
    }
  }
  (t.mouseX = 0),
    (t.mouseY = 0),
    (t.onclick = !1),
    (t.keyMap = new Map()),
    (t.pressed = new Map()),
    (t.mouseMap = new Map()),
    (t.mousePressed = new Map());
  const s = t;
  class a {
    constructor() {}
    static create(e, t, s, r) {
      let i = document.createElement('canvas');
      (i.id = e),
        (i.width = t),
        (i.height = s),
        (i.style.zIndex = r.toString()),
        a.layerBuffer.set(e, i);
    }
    static get(e) {
      return a.get(e);
    }
  }
  a.layerBuffer = new Map();
  const r = a;
  class i {
    constructor(e, t, s, a, r, i) {
      (this.image = e),
        (this.sx = t),
        (this.sy = s),
        (this.width = a),
        (this.height = r),
        (this.scale = i);
    }
    draw(e, t, s) {
      let a = s.x,
        r = s.y;
      e.drawImage(
        this.image,
        this.sx * this.width,
        this.sy * this.height,
        this.width,
        this.height,
        a,
        r,
        this.width * this.scale,
        this.height * this.scale
      );
    }
  }
  class n {
    constructor() {
      (n.imageBuffer = new Map()), (n.spriteBuffer = new Map());
    }
    async mainLoader() {
      for (const [e, t] of n.imageBuffer.entries()) {
        let s = await n.loadImage(t);
        n.imageBuffer.set(e, s);
      }
      for (const [e, t] of n.spriteBuffer.entries()) {
        let s = await n.loadImage(t.src),
          a = new i(s, t.x, t.y, t.w, t.h, t.s);
        n.spriteBuffer.set(e, a);
      }
    }
    preload() {}
    static loadImage(e) {
      return new Promise((t) => {
        const s = new Image();
        s.addEventListener('load', () => t(s)), (s.src = e);
      });
    }
    static image(e) {
      const { key: t, src: s } = e;
      if (n.imageBuffer.has(t))
        return m.warning(`The identifier "${t}" already exists`);
      n.imageBuffer.set(t, s);
    }
    static getImage(e) {
      let t = n.imageBuffer.get(e);
      return t || m.warning(`The identifier "${e}" does not match any element`);
    }
    static sprite(e) {
      const {
        key: t,
        src: s,
        config: { x: a, y: r, width: i, height: o, scale: c }
      } = e;
      if (n.spriteBuffer.has(t))
        return m.warning(`The identifier "${t}" already exists`);
      n.spriteBuffer.set(t, { src: s, x: a, y: r, w: i, h: o, s: c });
    }
    static getSprite(e) {
      let t = n.spriteBuffer.get(e);
      return t || m.warning(`The identifier "${e}" does not match any element`);
    }
  }
  const o = n;
  const c = class {
    constructor() {}
    static shuffle(e) {
      let t = e;
      for (var s = t.length - 1; s > 0; --s) {
        let e = Math.floor(Math.random() * (s + 1)),
          a = t[s];
        (t[s] = t[e]), (t[e] = a);
      }
      return t;
    }
    static randomRange(e, t) {
      return Math.floor(Math.random() * (t - e + 1)) + e;
    }
    static matrix2d(e, t, s) {
      const a = [];
      for (let s = 0; s < t; ++s) for (let t = 0; t < e; ++t) a[s] = [];
      if (null != s)
        for (let r = 0; r < t; ++r) for (let t = 0; t < e; ++t) a[r][t] = s;
      return a;
    }
    static shuffle2dArray(e) {
      for (var t = 0; t < e.length; ++t)
        for (var s = 0; s < e[t].length; ++s) {
          let a = Math.floor(Math.random() * e.length),
            r = Math.floor(Math.random() * e.length),
            i = e[t][s];
          (e[t][s] = e[a][r]), (e[a][r] = i);
        }
    }
    static getPosition(e, t) {
      return { x: e, y: t };
    }
  };
  class h {
    constructor(e) {
      const { id: t, position: s, sprite: a } = e;
      (this.id = t),
        (this.position = s),
        (this.mask = { width: void 0, height: void 0 }),
        this.create();
    }
    create() {}
    static idGenerator() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (e) {
          var t = (16 * Math.random()) | 0;
          return ('x' == e ? t : (3 & t) | 8).toString(16);
        }
      );
    }
    static defineGroup(e) {
      h.instances[e] = [];
    }
    static getGroup(e) {
      return h.instances[e];
    }
    static create(e, t, s) {
      const a = new t({
        id: h.idGenerator(),
        position: s.position,
        sprite: s.sprite
      });
      return h.instances[e].push(a), a;
    }
    static destroy(e) {
      for (const [t, s] of h.instances.entries())
        if (s.id === e.id) {
          h.instances.splice(t, 1);
          break;
        }
    }
  }
  h.instances = {};
  const d = class {
    constructor() {
      (this.fps = 30),
        (this.frameDuration = 1e3 / this.fps),
        (this.prevTime = performance.now()),
        (this.accumulatedFrameTime = 0),
        window.requestAnimationFrame((e) => {
          this.mainLoop(e);
        });
    }
    mainLoop(e) {
      const t = e - this.prevTime;
      (this.prevTime = e), (this.accumulatedFrameTime += t);
      let s = 0;
      for (; this.accumulatedFrameTime >= this.frameDuration; )
        if (
          (this.update(this.frameDuration),
          this.updateManager(this.frameDuration),
          (this.accumulatedFrameTime -= this.frameDuration),
          s++ >= 200)
        ) {
          this.accumulatedFrameTime = 0;
          break;
        }
      const a = this.accumulatedFrameTime / this.frameDuration;
      this.renderManager(a),
        this.render(a),
        window.requestAnimationFrame((e) => {
          this.mainLoop(e);
        });
    }
    updateManager(e) {}
    update(e) {}
    renderManager(e) {}
    render(e) {}
  };
  class u {
    constructor(e) {
      (this.canvas = document.createElement('canvas')),
        (this.canvas.id = 'canvas-elements'),
        (this.canvas.width = e.width),
        (this.canvas.height = e.height),
        (this.canvas.style.zIndex = '1'),
        (this.ctx = this.canvas.getContext('2d')),
        (this.backgroundColor = e.backgroundColor ?? '#374a52'),
        (this.loader = new o()),
        (this.timer = new d()),
        (this.layer = new r());
    }
    init() {
      this.loader.preload(),
        this.loader.mainLoader().then(() => {
          console.log(
            '%c Nino.JS v2.0.0 ',
            'color: black; font-weight: 900; background-color: aquamarine'
          ),
            document.getElementById('main-canvas').appendChild(this.canvas),
            (this.timer.updateManager = (e) => this.updateManager(e)),
            (this.timer.renderManager = (e) => this.renderManager(e)),
            u.Input.init(this.canvas),
            this.setup();
        });
    }
    updateManager(e) {
      for (let t in h.instances)
        h.instances[t].forEach((t) => {
          t.update(e);
        });
    }
    renderManager(e) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let t in h.instances)
        h.instances[t].forEach((t) => {
          t.draw(this.ctx, e);
        });
    }
    setup() {
      throw new Error('Method not implemented.');
    }
    start() {
      this.init();
    }
    static warning(e) {
      return console.warn(e), null;
    }
  }
  (u.Load = o), (u.Object = h), (u.Input = s), (u.Math = c), (u.Layer = r);
  const m = u;
})();
