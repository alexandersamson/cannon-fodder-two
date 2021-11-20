import {EffectLine} from "./effect-line";
import {EffectPointGunshotImpact} from "./effect-point-gunshot-impact";
import {EffectPointGunshotImpactSpread} from "./effect-point-gunshot-impact-spread";
import {EffectPointGunshotMuzzleFlash} from "./effect-point-gunshot-muzzle-flash";
import {Color} from "./color";

export class EffectLineGunshotPrecise extends EffectLine{
  constructor() {
    super();
    this.colorStart = new Color(255, 255, 0, 200);
    this.colorEnd = new Color(255, 255, 0, 50);
    this.lifespanMax = 70;
    this.lifespan = 70;
    this.lineWidthStart = 2;
    this.lineWidthEnd = 0;
    this.sourceEffects = [new EffectPointGunshotMuzzleFlash()];
    this.targetEffects = [new EffectPointGunshotImpact(), new EffectPointGunshotImpactSpread()];
    this.scatterAtEnd = 5;
  }
}
