import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {Bullet556} from "../../ammo/bullet-556";
import {RifleSmallCaliber} from "./rifle-small-caliber";
import {EffectLineGunshotPrecise} from "../../effects/effect-line-gunshot-precise";
import {Bullet556Hv} from "../../ammo/bullet-556hv";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {Projectile9mmPistolBullet} from "../../projectiles/bullets/projectile-9mm-pistol-bullet";
import {ProjectileBoltAction556Bullet} from "../../projectiles/bullets/projectile-bolt-action-556-bullet";

export class BoltActionRifle556 extends RifleSmallCaliber{
  constructor() {
    super();
    this.name = "5.56mm Bolt Action Rifle";
    this.shortName = "B.A. Rifle 556";
    this.prefix = "Light";
    this.description = "A very decent bolt action rifle, chambered in 5.56mm ammo. Low accuracy while moving.";
    this.descriptionBuy = "A very decent bolt action rifle, chambered in 5.56mm ammo. Low accuracy while moving.";
    this.title = 'Bolt Action Rifle';
    this.type = "Ranged weapon";
    this.durability?.setOwnInitDurabilityAmount(500); // Bolt action rifles need higher maintenance to preserve accuracy on the longer ranges
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 3;
    this.maxStackSize = 1;

    //PROJECTILE
    this.projectile = new ProjectileBoltAction556Bullet();

    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new Bullet556(), new Bullet556Hv()];
    this.magazine.assignToWeapon(this,10);
    this.loadTimeSet = 2000;

    //FX
    this.fxAttackChannel = []; //Bolt action rifle is a precise weapon

    //SOUNDS
    this.sounds.playOnUse = ['weapons/rifle-bolt-action-shooting-1'];
    this.sounds.playOnLoad = ['weapons/bolt-action-reloading-1'];
  }
}
