import {EffectLine} from "./effect-line";
import {EffectPointGunshotMuzzleFlash} from "./effect-point-gunshot-muzzle-flash";
import {EffectLineEnergyWeaponPhotonLineBorder} from "./effect-line-energy-weapon-photon-line-border";
import {EffectPointEnergyWeaponImpactSmall} from "./effect-point-energy-weapon-impact-small";
import {EffectPointEnergyWeaponImpactSmallSpread} from "./effect-point-energy-weapon-impact-small-spread";
import {Color} from "./color";

export class EffectLineEnergyWeaponPhotonSmall extends EffectLine{
  constructor() {
    super();
    this.colorStart = new Color(255,255,255,200);
    this.colorEnd = new Color(255,255,255,30);
    this.lifespanMax = 100;
    this.lifespan = 100;
    this.lineWidthStart = 3.5;
    this.lineWidthEnd = 0;
    this.sourceEffects = [new EffectPointGunshotMuzzleFlash()];
    this.targetEffects = [new EffectPointEnergyWeaponImpactSmall(), new EffectPointEnergyWeaponImpactSmallSpread()];
    this.coCallLineEffects = [new EffectLineEnergyWeaponPhotonLineBorder()];
    this.scatterAtEnd = 9;
  }
}
