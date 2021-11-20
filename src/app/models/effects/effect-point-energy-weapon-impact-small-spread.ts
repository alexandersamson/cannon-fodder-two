import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointEnergyWeaponImpactSmallSpread extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(228, 228, 255, 200);
    this.colorEnd = new Color(32, 32, 255, 0);
    this.lifespanMax = 100;
    this.lifespan = 100;
    this.lineWidthStart = 1;
    this.radius = 12;
  }

}
