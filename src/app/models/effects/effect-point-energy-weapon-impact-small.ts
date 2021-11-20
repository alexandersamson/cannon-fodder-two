import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointEnergyWeaponImpactSmall extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(228, 228, 255, 200);
    this.colorEnd = new Color(96, 96, 255, 5);
    this.lifespanMax = 900;
    this.lifespan = 900;
    this.lineWidthStart = 1;
    this.radius = 2.5;
  }

}
