import {Bullet50calAe} from "../../ammo/bullet-50cal-ae";
import {Projectile50AEPistolBullet} from "../../projectiles/bullets/projectile-50AE-pistol-bullet";
import {RocketLauncher} from "./rocket-launcher";
import {RocketMissilePml} from "../../ammo/rocket-missile-pml";
import {ProjectileRocketPmlMissile} from "../../projectiles/bullets/projectile-rocket-pml-missile";

export class PersonalMissileLauncher extends RocketLauncher{
  constructor() {
    super();
    this.name = "Personal Missile Launcher Mk1";
    this.shortName = "PML MK1";
    this.level = 1;
    this.rarityLevel = 1;
    this.weight = 4.8; //Heavy duty rocket launcher
    this.maxStackSize = 1;

    //HITS PER SECOND
    this.hps = 10; // fires 4 missiles short after each other

    //DAMAGE
    this.projectile = new ProjectileRocketPmlMissile()


    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new RocketMissilePml()];
    this.magazine.assignToWeapon(this,4); // The rocket launcher fits 4 rockets a time, what a feast
    this.loadTimeSet = 2300;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/pistol-shooting-3'];
    this.sounds.playOnLoad = ['weapons/pistol-reloading-1'];
  }
}
