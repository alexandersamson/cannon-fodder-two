import {Effect} from "./effect";
import {Vector} from "../movement/vector";
import {GameViewport} from "../game-canvas/game-viewport";
import {Color} from "./color";
import {C} from "@angular/cdk/keycodes";

export class EffectProjectile extends Effect{
  radius: number = 5;
  size: Vector = new Vector(2,6,0)
  rotation: number = 0;
  colorStart = new Color(255,255,128,250);
  colorEnd = new Color(200,110,60,250);

  constructor() {
    super();
    this.colorStart = new Color(255,255,128,255);
    this.colorEnd = new Color(200,110,60,10);
    this.lifespanMax = 20;
    this.lifespan = 20;
  }

  draw(viewPort: GameViewport, ctx: CanvasRenderingContext2D, position: Vector = this.startPos, rotation: number = this.rotation) {
    let relativePos: Vector = viewPort.getRelativePosOfVector(position)
    ctx.save();
    ctx.translate(relativePos.x, relativePos.y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.strokeStyle = this.getColor();
    ctx.rect(0,0,this.size.x,this.size.y)
    ctx.stroke();
    ctx.fillStyle = this.getColor();
    ctx.fill();
    ctx.restore();
  }

}
