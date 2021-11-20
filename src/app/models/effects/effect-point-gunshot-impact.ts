import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointGunshotImpact extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(255, 228, 0, 200);
    this.colorEnd = new Color(255, 128, 0, 2);
    this.lifespanMax = 420;
    this.lifespan = 420;
    this.lineWidthStart = 1;
    this.radius = 1.3;
  }

}
