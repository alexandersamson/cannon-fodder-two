import {Weapon} from "../weapon";
import {EffectLineEnergyWeaponPhotonSmall} from "../../effects/effect-line-energy-weapon-photon-small";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {ProjectileBoltAction556Bullet} from "../../projectiles/bullets/projectile-bolt-action-556-bullet";

export class EnergyRifle extends Weapon{
  constructor() {
    super();
    this.name = "Energy Rifle";
    this.description = "Energy Rifles have more durability and do massive damage, but comes with a huge cost for their ammo.";
    this.descriptionBuy = "Energy Rifles have more durability and do massive damage, but comes with a higher price for their ammo.";
    this.title = 'Energy Rifle';
    this.type = "Ranged energy weapon";
    this.durability?.setOwnInitDurabilityAmount(2000); //Energy weapons have high durability
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.ammoPerUse = 1;
    this.usableAmmo = [];
    this.hps = 1;


    this.projectile = new ProjectileBoltAction556Bullet();

    this.fxAttackChannel = [];
  }
}
