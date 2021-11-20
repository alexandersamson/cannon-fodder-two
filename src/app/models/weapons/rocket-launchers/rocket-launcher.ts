import {Weapon} from "../weapon";


export class RocketLauncher extends Weapon{
  constructor() {
    super();
    this.name = "Rocket Launcher";
    this.description = "Destructive device. Used to cause mayhem at long distances.";
    this.descriptionBuy = "Destructive device. Used to cause mayhem at long distances.";
    this.title = 'Rocket Launcher';
    this.type = 'Ranged destructive device';
    this.isWeapon = true;
    this.isTool = false;
    this.loadTimeSet = 2200;
    this.ammoPerUse = 1;
    this.hps = 1; //About 5 shots per second is okay for most handguns
    this.durability?.setOwnInitDurabilityAmount(150); //Rocket launchers go about 100-200

  }
}
