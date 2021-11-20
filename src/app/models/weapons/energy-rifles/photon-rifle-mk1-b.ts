import {DamageTypeSmallEnergyWeapon} from "../../combat/damage-type-small-energy-weapon";
import {EnergyRifle} from "./energy-rifle";
import {EwcSmall} from "../../ammo/ewc-small";
import {EffectLineEnergyWeaponPhotonSmall} from "../../effects/effect-line-energy-weapon-photon-small";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";


export class PhotonRifleMk1B extends EnergyRifle{
  constructor() {
    super();
    this.name = "Photon Rifle Mk 1-B";
    this.shortName = "Ph. Rifle Mk1B";
    this.description = "The Photon Rifle Mk 1-B is a lightweight, but very powerful medium-range energy weapon with a double barrel. Uses Small Energy Weapon  Cells";
    this.descriptionBuy = "The Photon Rifle Mk 1-B is a affordable lightweight, but very powerful medium-range energy weapon with double barrel. Uses expensive Small Energy Weapon Cells.";
    this.title = 'Energy Rifle | Double Barrel';
    this.type = "Ranged energy weapon";
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 3.25 // energy rifles tend to be a little lighter than gun-types, but this one has a double barrel, so weighs more
    this.maxStackSize = 1;


    //AMMO
    this.ammoPerUse = 2; // has a double barrel
    this.usableAmmo = [new EwcSmall()];
    this.magazine.assignToWeapon(this,30);
    this.loadTimeSet = 1800;

    //FX
    this.fxAttackChannel = [];

    //SOUNDS
    this.sounds.playOnUse = ['weapons/photon-rifle-shooting-1'];
    this.sounds.playOnLoad = ['weapons/energy-weapon-reloading-1'];
  }

}
