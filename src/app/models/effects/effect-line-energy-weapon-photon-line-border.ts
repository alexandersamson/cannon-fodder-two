import {EffectLine} from "./effect-line";
import {Color} from "./color";

export class EffectLineEnergyWeaponPhotonLineBorder extends EffectLine{
  constructor() {
    super();
    this.colorStart = new Color(255, 255, 255, 40);
    this.colorEnd = new Color(50, 50, 255, 0);
    this.lifespanMax = 500;
    this.lifespan = 500;
    this.lineWidthStart = 11;
    this.lineWidthEnd = 0;
    this.sourceEffects = [];
    this.targetEffects = [];
    this.scatterAtEnd = 9;
  }
}
