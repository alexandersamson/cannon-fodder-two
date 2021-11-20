import {EffectPoint} from "./effect-point";
import {Color} from "./color";

export class EffectPointEnergyWeaponLaserImpactSmall extends EffectPoint{
  constructor() {
    super();
    this.colorStart = new Color(236, 128, 60, 200);
    this.colorEnd = new Color(96, 64, 12, 5);
    this.lifespanMax = 1200;
    this.lifespan = 1200;
    this.lineWidthStart = 1;
    this.radius = 2;
  }

}
