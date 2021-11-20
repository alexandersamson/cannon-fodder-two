import {DamageTypeSmallEnergyWeapon} from "../../combat/damage-type-small-energy-weapon";
import {EnergyRifle} from "./energy-rifle";
import {EwcSmall} from "../../ammo/ewc-small";
import {EffectLineEnergyWeaponPhotonSmall} from "../../effects/effect-line-energy-weapon-photon-small";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";


export class PhotonRifleMk1 extends EnergyRifle{
  constructor() {
    super();
    this.name = "Photon Rifle Mk 1";
    this.shortName = "Ph. Rifle Mk1";
    this.description = "The Photon Rifle Mk 1 is a lightweight, but very powerful medium-range energy weapon. Uses Small Energy Weapon  Cells";
    this.descriptionBuy = "The Photon Rifle Mk 1 is a affordable lightweight, but very powerful medium-range energy weapon. Uses expensive Small Energy Weapon Cells.";
    this.title = 'Energy Rifle';
    this.type = "Ranged energy weapon";
    this.isWeapon = true;
    this.isTool = false;
    this.level = 1;
    this.weight = 2.75 // energy rifles tend to be a little lighter than gun-types
    this.maxStackSize = 1;



    //AMMO
    this.ammoPerUse = 1;
    this.usableAmmo = [new EwcSmall()];
    this.magazine.assignToWeapon(this,15);
    this.loadTimeSet = 1800;

    //FX
    this.fxAttackChannel = []; //Bolt action rifle is a precise weapon

    //SOUNDS
    this.sounds.playOnUse = ['weapons/photon-rifle-shooting-1'];
    this.sounds.playOnLoad = ['weapons/energy-weapon-reloading-1'];
  }

}
