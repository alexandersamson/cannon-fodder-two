import {Effect} from "./effect";
import {EffectPoint} from "./effect-point";
import {GameViewport} from "../game-canvas/game-viewport";
import {Vector} from "../movement/vector";

export class EffectLine extends Effect{

  sourceEffects: Array<EffectPoint> = [];
  targetEffects: Array<EffectPoint> = [];
  coCallLineEffects: Array<EffectLine> = []; //Do not call self or recursive callbacks!
  missedTarget: boolean = false;
  criticalHit: boolean = false;

  constructor() {
    super();
  }

  draw(viewPort: GameViewport, c: CanvasRenderingContext2D) {
    let relativeStartPos: Vector = viewPort.getRelativePosOfVector(this.startPos);
    let relativeEndPos: Vector = viewPort.getRelativePosOfVector(this.endPos);
    c.beginPath();
    c.moveTo(relativeStartPos.x, relativeStartPos.y);
    c.lineTo(relativeEndPos.x, relativeEndPos.y);
    c.lineWidth = this.getLineWidth();
    c.strokeStyle = this.getColor();
    c.stroke();
  }

}
