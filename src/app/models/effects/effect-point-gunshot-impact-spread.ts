import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointGunshotImpactSpread extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(255, 228, 0, 150);
    this.colorEnd = new Color(255, 100, 0, 0);
    this.lifespanMax = 50;
    this.lifespan = 50;
    this.lineWidthStart = 1;
    this.radius = 4.5;
  }

}
