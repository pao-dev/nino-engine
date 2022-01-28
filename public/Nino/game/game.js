import Nino from "../nino.js";
import Board from "./board.js";
const game = new Nino({
    frames: 60,
    width: 768,
    height: 768,
    backgroundColor: "#374a52"
});
game.loader.preload = () => {
    // arrow
    Nino.Load.sprite({
        key: "interface-selector",
        src: "assets/imgs/board-sprites.png",
        config: {
            x: 2,
            y: 0,
            width: 128,
            height: 128,
            scale: 0.5
        }
    });
    // sprites
    Nino.Load.sprite({
        key: "P1-sprite",
        src: "assets/imgs/board-sprites.png",
        config: {
            x: 0,
            y: 0,
            width: 128,
            height: 128,
            scale: 0.5
        }
    });
    Nino.Load.sprite({
        key: "P2-sprite",
        src: "assets/imgs/board-sprites.png",
        config: {
            x: 1,
            y: 0,
            width: 128,
            height: 128,
            scale: 0.5
        }
    });
    // Materials
    Nino.Load.sprite({
        key: "tree-sprite",
        src: "assets/imgs/board-sprites.png",
        config: {
            x: 1,
            y: 1,
            width: 128,
            height: 128,
            scale: 0.5
        }
    });
    Nino.Load.sprite({
        key: "rock-sprite",
        src: "assets/imgs/board-sprites.png",
        config: {
            x: 2,
            y: 1,
            width: 128,
            height: 128,
            scale: 0.5
        }
    });
};
game.setup = () => {
    Nino.Layer.create("bg", 100, 100, 10);
    Nino.Object.defineGroup("controller");
    Nino.Object.create("controller", Board, {});
};
game.timer.update = (deltaTime) => { };
game.timer.render = (interpolation) => { };
// Start Game
game.start();
