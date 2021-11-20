import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {Bullet556} from "../../ammo/bullet-556";
import {RifleSmallCaliber} from "./rifle-small-caliber";
import {EffectLineGunshotPrecise} from "../../effects/effect-line-gunshot-precise";
import {Bullet556Hv} from "../../ammo/bullet-556hv";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {ProjectileM4a1556Bullet} from "../../projectiles/bullets/projectile-m4a1-556-bullet";

export class M4A1 extends RifleSmallCaliber{
  constructor() {
    super();

    //GENERAL PROPERTIES
    this.name = "M4A1 5.56mm Carbine";
    this.shortName = "M4A1 Carbine";
    this.description = "A very decent automatic carbine. Uses 5.56mm ammo.";
    this.descriptionBuy = "A very decent automatic carbine. Uses 5.56mm ammo.";
    this.title = 'Automatic Carbine';
    this.type = "Ranged weapon";
    this.durability?.setOwnInitDurabilityAmount(1500);
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 3;
    this.maxStackSize = 1;

    //FPS
    this.hps = 10;

    //DAMAGE
    this.projectile = new ProjectileM4a1556Bullet()


    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new Bullet556(), new Bullet556Hv()];
    this.magazine.assignToWeapon(this,30);
    this.loadTimeSet = 1800;

    //COSMETICS
    this.fxAttackChannel = []; //M4A1 carbine is a precise weapon

    //SOUNDS
    this.sounds.playOnUse = ['weapons/rifle-556-shooting-1'];
    this.sounds.playOnLoad = ['weapons/carbine-reloading-1'];
  }
}
