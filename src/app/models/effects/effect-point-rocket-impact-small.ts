import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class effectPointRocketImpactSmall extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(255, 228, 228, 228);
    this.colorEnd = new Color(255, 128, 64, 100);
    this.lifespanMax = 100;
    this.lifespan = 100;
    this.lineWidthStart = 1;
    this.radius = 30;
  }

}
