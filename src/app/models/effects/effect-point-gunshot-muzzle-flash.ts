import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointGunshotMuzzleFlash extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(255, 228, 0, 25);
    this.colorEnd = new Color(255, 100, 0, 0);
    this.lifespanMax = 50;
    this.lifespan = 50;
    this.lineWidthStart = 0;
    this.radius = 25;
  }

}
