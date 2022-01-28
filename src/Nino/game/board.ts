import { position } from "./../interfaces";
import Nino from "../nino.js";
import Player from "./player.js";
import Tile from "./tile.js";

class Board extends Nino.Object {
  public static state = "placing";
  public static turn = 0;
  public static dice = 0;
  public static playerNumber: any = 2;
  public static players: any = [];

  //
  public xpos: number = 0;
  public ypos: number = 0;

  //
  public lastX: any = [];
  public lastY: any = [];

  public bounds: any = [];
  // Map

  public mapWidth: number = 12;
  public mapHeight: number = 12;

  public tileSizeX: number = 64;
  public tileSizeY: number = 64;

  public trees: number = 8;
  public rock: number = 8;

  // public materialMatrix: any = new Array(12 * 12).fill(0);;
  public materialMatrix: any = Nino.Math.matrix2d(
    this.mapWidth,
    this.mapHeight,
    0
  );

  constructor(properties: any) {
    super(properties);

    // Iterate players
    Nino.Object.defineGroup("a-players");

    for (let x = 0; x < Board.playerNumber; ++x) {
      let player = Nino.Object.create("a-players", Player, {
        position: {
          x: -100,
          y: -100
        }
      });
      player.number = x;
      Board.players.push(player);
    }
    // Draw board
    this.drawBoard();

    // Generate map
    this.generateMap();
  }
  public turn() {
    if (Board.turn >= Board.playerNumber - 1) {
      Board.turn = 0;

      if (Board.state == "placing") {
        Board.state = "start";
      }
    } else Board.turn++;

    if (Board.state == "start") {
      let d = Nino.Math.randomRange(1, 6);
      Board.dice = d;
      // cambiar de player
      console.log("Numero random:", d);

      this.defineBounds();
    }
  }
  public defineBounds() {
    this.bounds = [];

    for (let xoff = -1; xoff <= 1; ++xoff) {
      for (let yoff = -1; yoff <= 1; ++yoff) {
        if (xoff == 0 && yoff == 0) continue;

        let xpos = this.lastX[Board.turn] + xoff;
        let ypos = this.lastY[Board.turn] + yoff;

        // Saber si esta dentro de los limites
        if (
          xpos > -1 &&
          xpos < this.mapWidth &&
          ypos > -1 &&
          ypos < this.mapHeight
        ) {
          if (this.materialMatrix[ypos][xpos] == 0) {
            this.bounds.push({
              xoff: xpos,
              yoff: ypos
            });
          }
        }
      }
    }
  }
  public update(deltaTime: number) {
    // Position relative to the grid
    this.xpos = Math.floor(Nino.Input.mouseX / this.tileSizeX) * this.tileSizeX;
    this.ypos = Math.floor(Nino.Input.mouseY / this.tileSizeY) * this.tileSizeY;

    switch (Board.state) {
      case "placing":
        let xposIndex = this.xpos / this.tileSizeX;
        let yposIndex = this.ypos / this.tileSizeY;

        Board.players[Board.turn].position.x = this.xpos;
        Board.players[Board.turn].position.y = this.ypos;

        if (Nino.Input.getClickPress("b")) {
          // Si esta dentro de un objeto
          console.log(yposIndex, ">=", this.mapHeight);
          console.log(yposIndex >= this.mapHeight);

          // Delimitar alcance
          if (
            xposIndex < 0 ||
            xposIndex > this.mapWidth ||
            yposIndex < 0 ||
            yposIndex >= this.mapHeight
          ) {
            console.log("No puedes colocar tu personaje afuera");
            break;
          }

          if (this.materialMatrix[yposIndex][xposIndex] != 0) {
            console.log(
              "No puedes colocar tu personaje sobre un bloque solido"
            );
            break;
          }

          this.lastX[Board.turn] = xposIndex;
          this.lastY[Board.turn] = yposIndex;

          Board.players[Board.turn].position = Nino.Math.getPosition(
            this.xpos,
            this.ypos
          );

          this.turn();
        }
        break;

      case "start":
        if (Nino.Input.getClickPress("b")) {
          let insideBounds = false;
          for (let position of this.bounds) {
            if (
              position.xoff * this.tileSizeX == this.xpos &&
              position.yoff * this.tileSizeY == this.ypos
            ) {
              insideBounds = true;
            }
          }
          if (!insideBounds) return;

          Board.players[Board.turn].position.x = this.xpos;
          Board.players[Board.turn].position.y = this.ypos;

          this.lastX[Board.turn] = this.xpos / this.tileSizeX;
          this.lastY[Board.turn] = this.ypos / this.tileSizeY;

          // Dibujar bounds
          this.defineBounds();

          Board.dice--;
          console.log(Board.dice);

          // Si se acaba el turno
          if (Board.dice <= 0) this.turn();
        }
        break;

      default:
        break;
    }
  }
  public draw(ctx: CanvasRenderingContext2D, interpolation: number): void {
    // Dibujar posiciones
    if (Board.state == "start") {
      for (let _bound of this.bounds) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fillRect(_bound.xoff * 64, _bound.yoff * 64, 64, 64);
      }
    }

    // Dibujar cruceta
    Nino.Load.getSprite("interface-selector")?.draw(
      ctx,
      interpolation,
      Nino.Math.getPosition(this.xpos, this.ypos)
    );
  }
  public drawBoard() {
    let canvas = document.createElement("canvas");
    canvas.id = "canvas-background";
    canvas.width = 768;
    canvas.height = 768;
    canvas.style.zIndex = "0";

    let _ctx: any = canvas.getContext("2d");
    let e: any = document.getElementById("main-canvas");
    e.appendChild(canvas);

    for (let y = 0; y < 12; ++y) {
      for (let x = 0; x < 12; ++x) {
        _ctx.fillStyle = "#92AD1F";
        _ctx.fillRect(x * 64, y * 64, 64, 64);
        _ctx.strokeStyle = "#707F14";
        _ctx.strokeRect(x * 64, y * 64, 64, 64);
      }
    }
  }

  public generateMap() {
    let trees = 8;
    let rocks = 8;

    for (let y = 0; y < this.mapHeight; ++y) {
      for (let x = 0; x < this.mapWidth; ++x) {
        if (trees > 0) {
          this.materialMatrix[y][x] = 1;
          --trees;
        } else if (rocks > 0) {
          this.materialMatrix[y][x] = 2;
          --rocks;
        } else {
          this.materialMatrix[y][x] = 0;
        }
      }
    }
    Nino.Math.shuffle2dArray(this.materialMatrix);

    Nino.Object.defineGroup("b-tiles");
    for (let y = 0; y < this.mapHeight; ++y) {
      for (let x = 0; x < this.mapWidth; ++x) {
        let materialIndex = this.materialMatrix[y][x];
        if (materialIndex) {
          let tile = Nino.Object.create("b-tiles", Tile, {
            position: {
              x: x * this.tileSizeX,
              y: y * this.tileSizeY
            }
          });
          tile.defineType(materialIndex);
        }
      }
    }
    let matrix = [].concat(...this.materialMatrix).join("");
    console.log(matrix);
  }
}

export default Board;
