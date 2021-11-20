import {DamageTypeSmallEnergyWeapon} from "../../combat/damage-type-small-energy-weapon";
import {EnergyRifle} from "./energy-rifle";
import {EwcMedium} from "../../ammo/ewc-medium";
import {EffectLineEnergyWeaponLaserMedium} from "../../effects/effect-line-energy-weapon-laser-medium";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";


export class LaserRifle extends EnergyRifle{
  constructor() {
    super();
    this.name = "Laser Rifle";
    this.description = "The Laser Rifle is not to mess around with. Uses expensive Energy Weapon Cells, but delivers a whopping blast over long range.";
    this.descriptionBuy = "The Laser Rifle is not to mess around with. Uses expensive Energy Weapon Cells, but delivers a whopping blast over long range.";
    this.title = 'Energy Rifle';
    this.type = "Ranged energy weapon";
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 3.5 // energy rifles tend to be a little lighter than gun-types, but this one has a double barrel, so weighs more
    this.maxStackSize = 1;


    //AMMO
    this.ammoPerUse = 1; // has a double barrel
    this.usableAmmo = [new EwcMedium()];
    this.magazine.assignToWeapon(this,10);
    this.loadTimeSet = 2000;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/photon-rifle-shooting-1'];
    this.sounds.playOnLoad = ['weapons/energy-weapon-reloading-1'];
  }

}
