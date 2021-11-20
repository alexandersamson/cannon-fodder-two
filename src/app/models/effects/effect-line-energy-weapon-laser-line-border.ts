import {EffectLine} from "./effect-line";
import {Color} from "./color";

export class EffectLineEnergyWeaponLaserLineBorder extends EffectLine{
  constructor() {
    super();
    this.colorStart = new Color(255, 50, 50, 50);
    this.colorEnd = new Color(255, 50, 50, 0);
    this.lifespanMax = 500;
    this.lifespan = 500;
    this.lineWidthStart = 9;
    this.lineWidthEnd = 0;
    this.sourceEffects = [];
    this.targetEffects = [];
    this.scatterAtEnd = 6;
  }
}
