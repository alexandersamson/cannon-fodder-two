import {Weapon} from "../weapon";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {EffectLineGunshot} from "../../effects/effect-line-gunshot";
import {Bullet9mm} from "../../ammo/bullet-9mm";
import {Bullet9mmHv} from "../../ammo/bullet9mm-hv";
import {Bullet9mmHp} from "../../ammo/bullet-9mm-hp";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {Projectile9mmPistolBullet} from "../../projectiles/bullets/projectile-9mm-pistol-bullet";
import {Projectile9mmMp5Bullet} from "../../projectiles/bullets/projectile-9mm-mp5-bullet";


export class Mp5 extends Weapon{
  constructor() {
    super();
    this.name = "MP5";
    this.description = "A simple yet effective firearm for close range.";
    this.descriptionBuy = "A simple yet effective firearm for close range. Priced reasonably.";
    this.title = 'SMG';
    this.type = 'Ranged weapon';
    this.isWeapon = true;
    this.isTool = false;
    this.weight = 3.1;
    this.maxStackSize = 1;

    //HITS PER SECOND
    this.hps = 13; //About 12 shots per second is okay for most smg's

    //PROJECTILE
    this.projectile = new Projectile9mmMp5Bullet()

    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [Bullet9mm.prototype, Bullet9mmHp.prototype, Bullet9mmHv.prototype];
    this.magazine.assignToWeapon(this,30);
    this.loadTimeSet = 1500;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/pistol-shooting-1'];
    this.sounds.playOnLoad = ['weapons/carbine-reloading-1'];

  }
}
