import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet762 extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "7.62x51mm Bullet";
    this.shortName = "7.62mm Bullet";
    this.title = "Medium rifle ammo";
    this.description = "Ammo for medium rifles."
    this.descriptionBuy = "Ammo for medium rifles."
    this.cost = new BuildCost(1);
    this.maxStackSize = 30;
    this.weight = 0.020; //in kilos
    this.amount = amount;
  }
}
