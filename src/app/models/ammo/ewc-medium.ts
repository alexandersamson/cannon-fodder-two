import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class EwcMedium extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "Medium Energy Weapon Cell";
    this.shortName = "Medium EWC";
    this.title = "Medium Energy Weapon ammo cell";
    this.description = "Ammo cell for medium energy weapons."
    this.descriptionBuy = "Ammo cell for medium energy weapons. Expensive but powerful."
    this.cost = new BuildCost(50);
    this.maxStackSize = 20;
    this.weight = 0.050; //in kilos
    this.amount = amount;
  }
}
