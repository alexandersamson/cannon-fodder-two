import {Weapon} from "../weapon";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {EffectLineGunshot} from "../../effects/effect-line-gunshot";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";

export class RifleSmallCaliber extends Weapon{
  constructor() {
    super();
    this.name = "Small Caliber Rifle";
    this.description = "A small caliber rifle. Better damage, range and more expensive than a handgun.";
    this.descriptionBuy = "A small caliber rifle. Better damage, range and more expensive than a handgun.";
    this.title = 'Rifle';
    this.type = "weapon";
    this.durability?.setOwnInitDurabilityAmount(1000); //rifles have a higher durability
    this.isTool = false;
    this.level = 1;

    this.ammoPerUse = 1;

    this.hps = 1; // higher for automatic rifles, lower for bolt-action stuff


    this.fxAttackChannel = [new EffectLineGunshot()];
    this.durability?.setOwnInitDurabilityAmount(1500); //rifles have a higher durability
  }
}
