import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class effectPointRocketImpactSmallSpread extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(255, 165, 32, 150);
    this.colorEnd = new Color(255, 100, 0, 2);
    this.lifespanMax = 500;
    this.lifespan = 500;
    this.lineWidthStart = 1;
    this.radius = 90;
  }

}
