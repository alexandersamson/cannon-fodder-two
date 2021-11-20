import {Bullet9mm} from "../../ammo/bullet-9mm";
import {Bullet9mmHv} from "../../ammo/bullet9mm-hv";
import {Pistol} from "./pistol";
import {Bullet9mmHp} from "../../ammo/bullet-9mm-hp";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {EffectLineGunshot} from "../../effects/effect-line-gunshot";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {Projectile9mmPistolBullet} from "../../projectiles/bullets/projectile-9mm-pistol-bullet";

export class Pistol9mm extends Pistol{
  constructor() {
    super();
    this.name = "9mm Pistol";
    this.level = 1;
    this.rarityLevel = 1;
    this.weight = 0.9; //A simple pistol weighs about 900 grams
    this.maxStackSize = 1;


    //PROJECTILE
    this.projectile = new Projectile9mmPistolBullet();

    //HITS PER SECOND
    this.hps = 5; // 5 shots per second is okay for a pistol


    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new Bullet9mmHv(), new Bullet9mmHp(), new Bullet9mm()];
    this.magazine.assignToWeapon(this,15); // 15 rounds is standard for a pistol
    this.loadTimeSet = 1300;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/pistol-shooting-1'];
    this.sounds.playOnLoad = ['weapons/pistol-reloading-1'];
  }
}
