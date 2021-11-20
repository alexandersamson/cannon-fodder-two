import {Weapon} from "../weapon";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {EffectLineGunshot} from "../../effects/effect-line-gunshot";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {Projectile9mmPistolBullet} from "../../projectiles/bullets/projectile-9mm-pistol-bullet";


export class Smg extends Weapon{
  constructor() {
    super();
    this.name = "Sub Machine Gun";
    this.description = "A simple yet effective firearm for close range.";
    this.descriptionBuy = "A simple yet effective firearm for close range. Priced reasonably.";
    this.title = 'Sub Machine Gun';
    this.type = 'Ranged weapon';
    this.isWeapon = true;
    this.isTool = false;
    this.ammoPerUse = 1;

    this.projectile = new Projectile9mmPistolBullet();
    this.projectile.damageOnImpact.amounts = [new DamageSpreadFactor(3, 12)]; //12 is about right for standard 9mm smg's
    this.hps = 12; //About 12 shots per second is okay for most smg's
    this.projectile.maxEffectiveRange = 100; //100 meters is about the max effective range for a smg
    this.projectile.damageOnImpact.critChance = 0.1;
    this.projectile.damageOnImpact.critMultiplier = 2;
    this.projectile.damageOnImpact.name = "Smg shot";
    this.projectile.damageOnImpact.accuracy = 0.75; // SMG's aren't as accurate as rifles do. 75% is about right
    this.projectile.damageOnImpact.accuracyWhileMoving = 0.65; //SMG's are quite impressive on the move, since they are light.

    this.fxAttackChannel = [];
    this.durability?.setOwnInitDurabilityAmount(1250); //SMG's have a standard durability of 1000
  }
}
