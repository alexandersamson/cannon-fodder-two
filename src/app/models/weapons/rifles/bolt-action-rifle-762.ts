import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {RifleSmallCaliber} from "./rifle-small-caliber";
import {Bullet762} from "../../ammo/bullet-762";
import {EffectLineGunshotMediumPrecise} from "../../effects/effect-line-gunshot-medium-precise";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {ProjectileBoltAction762Bullet} from "../../projectiles/bullets/projectile-bolt-action-762-bullet";

export class BoltActionRifle762 extends RifleSmallCaliber{
  constructor() {
    super();
    this.name = "7.62x51mm Bolt Action Rifle";
    this.shortName = "B.A. Rifle 762";
    this.prefix = "Light";
    this.description = "A very decent bolt action rifle, chambered in 7.62mm ammo. Long range and high damage. Low accuracy while moving.";
    this.descriptionBuy = "A very decent bolt action rifle, chambered in 7.62mm ammo. Low accuracy while moving.";
    this.title = 'Bolt Action Rifle | 7.62';
    this.type = "Ranged weapon";
    this.durability?.setOwnInitDurabilityAmount(500); // Bolt action rifles need higher maintenance to preserve accuracy on the longer ranges
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 5;
    this.maxStackSize = 1;


    //HITS PER SECOND
    this.hps = 0.65; // higher for automatic rifles, lower for bolt-action stuff

    //PROJECTILE
    this.projectile = new ProjectileBoltAction762Bullet();

    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new Bullet762()];
    this.magazine.assignToWeapon(this,10);
    this.loadTimeSet = 2000;

    //FX
    this.fxAttackChannel = []; //Bolt action rifle is a precise weapon

    //SOUNDS
    this.sounds.playOnUse = ['weapons/rifle-bolt-action-shooting-1'];
    this.sounds.playOnLoad = ['weapons/bolt-action-reloading-1'];
  }
}
