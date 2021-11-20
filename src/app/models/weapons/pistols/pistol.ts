import {Weapon} from "../weapon";
import {DamageTypeSmallCaliberBullet} from "../../combat/damage-type-small-caliber-bullet";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";

export class Pistol extends Weapon{
  constructor() {
    super();
    this.name = "Pistol";
    this.description = "A simple yet effective firearm for close range.";
    this.descriptionBuy = "A simple yet effective firearm for close range. Priced reasonably.";
    this.title = 'Handgun';
    this.type = 'Ranged weapon';
    this.isWeapon = true;
    this.isTool = false;
    this.loadTimeSet = 1300;
    this.ammoPerUse = 1;
    this.hps = 5; //About 5 shots per second is okay for most handguns
    this.durability?.setOwnInitDurabilityAmount(1000); //Pistols have a standard durability of 1000

  }
}
