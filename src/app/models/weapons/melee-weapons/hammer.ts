import {Weapon} from "../weapon";
import {DamageTypeBluntForceMelee} from "../../combat/damage-type-blunt-force-melee";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";

export class Hammer extends Weapon{
  constructor() {
    super();
    this.name = "Hammer";
    this.description = "A nice and heavy hammer to do work with - or hit someone with. Can either be used as a weapon or as a tool";
    this.descriptionBuy = "A nice and heavy hammer to do work with - or hit someone with. Cheap and easy.";
    this.type = "construction-tool";
    this.ammoPerUse = 0;
    this.isWeapon = true;
    this.isTool = true;
    this.isShield = false;
    this.level = 1;
    this.prefix = '';
    this.title = 'Hammer';

    //DAMAGE

    //AMMO
    this.ammoPerUse = 0;
    this.usableAmmo = [];
  }
}
