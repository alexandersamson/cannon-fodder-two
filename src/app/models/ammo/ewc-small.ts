import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class EwcSmall extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "Small Energy Weapon Cell";
    this.shortName = "Small EWC";
    this.title = "Light Energy Weapon ammo cell";
    this.description = "Ammo cell for light energy weapons."
    this.descriptionBuy = "Ammo cell for light energy weapons."
    this.cost = new BuildCost(10);
    this.maxStackSize = 40;
    this.weight = 0.030; //in kilos
    this.amount = amount;
  }
}
