import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class RocketMissilePml extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "Personal Missile Launcher missile";
    this.shortName = "PML Missile";
    this.title = "Small explosive rocket";
    this.description = "Ammo for the Personal Missile Launcher. Homing death."
    this.descriptionBuy = "Ammo for the Personal Missile Launcher. Homing death."
    this.cost = new BuildCost(650);
    this.maxStackSize = 4;
    this.weight = 0.450; //in kilos
    this.amount = amount;
  }
}
