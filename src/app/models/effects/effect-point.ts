import {Effect} from "./effect";
import {Vector} from "../movement/vector";
import {GameViewport} from "../game-canvas/game-viewport";

export class EffectPoint extends Effect{
  radius: number = 5;

  constructor() {
    super();
  }

  draw(viewPort: GameViewport, c: CanvasRenderingContext2D) {
    let relativePos: Vector = viewPort.getRelativePosOfVector(this.startPos)
    c.beginPath();
    c.lineWidth = this.lineWidthStart;
    c.strokeStyle = this.getColor();
    c.arc(relativePos.x, relativePos.y, this.radius, 0, 2 * Math.PI);
    c.stroke();
    c.fillStyle = this.getColor();
    c.fill();
  }

}
