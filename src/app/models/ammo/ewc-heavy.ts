import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class EwcHeavy extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "Heavy Energy Weapon Cell";
    this.shortName = "Heavy EWC";
    this.title = "Heavy Energy Weapon ammo cell";
    this.description = "Ammo cell for heavy energy weapons."
    this.descriptionBuy = "Ammo cell for heavy energy weapons. Expensive but powerful."
    this.cost = new BuildCost(300);
    this.maxStackSize = 10;
    this.weight = 0.100; //in kilos
    this.amount = amount;
  }
}
