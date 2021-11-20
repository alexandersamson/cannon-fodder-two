import {Pistol} from "./pistol";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {Bullet50calAe} from "../../ammo/bullet-50cal-ae";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {Projectile50AEPistolBullet} from "../../projectiles/bullets/projectile-50AE-pistol-bullet";

export class DesertEagle50cal extends Pistol{
  constructor() {
    super();
    this.name = "Desert Eagle .50AE Pistol";
    this.shortName = "Desert Eagle";
    this.level = 1;
    this.rarityLevel = 1;
    this.weight = 0.9; //A simple pistol weighs about 900 grams
    this.maxStackSize = 1;

    //HITS PER SECOND
    this.hps = 4; // little less, because this is a literal cannon...

    //DAMAGE
    this.projectile = new Projectile50AEPistolBullet()


    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new Bullet50calAe()];
    this.magazine.assignToWeapon(this,7); // The desert Eagle has 7 rounds capacity for it's .50 cal model
    this.loadTimeSet = 1500;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/pistol-shooting-3'];
    this.sounds.playOnLoad = ['weapons/pistol-reloading-1'];
  }
}
