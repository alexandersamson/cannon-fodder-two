import {EffectLine} from "./effect-line";
import {EffectPointGunshotMuzzleFlash} from "./effect-point-gunshot-muzzle-flash";
import {EffectPointEnergyWeaponImpactSmallSpread} from "./effect-point-energy-weapon-impact-small-spread";
import {Color} from "./color";
import {EffectLineEnergyWeaponLaserLineBorder} from "./effect-line-energy-weapon-laser-line-border";
import {EffectPointEnergyWeaponLaserImpactSmall} from "./effect-point-energy-weapon-laser-impact-small";

export class EffectLineEnergyWeaponLaserMedium extends EffectLine{
  constructor() {
    super();
    this.colorStart = new Color(255,25,25,200);
    this.colorEnd = new Color(255,25,25,30);
    this.lifespanMax = 100;
    this.lifespan = 100;
    this.lineWidthStart = 3;
    this.lineWidthEnd = 0;
    this.sourceEffects = [new EffectPointGunshotMuzzleFlash()];
    this.targetEffects = [new EffectPointEnergyWeaponLaserImpactSmall(), new EffectPointEnergyWeaponImpactSmallSpread()];
    this.coCallLineEffects = [new EffectLineEnergyWeaponLaserLineBorder()]; //Be careful to not call effects that gom in a loop
    this.scatterAtEnd = 6; //little less, because it's a laser.
  }
}
