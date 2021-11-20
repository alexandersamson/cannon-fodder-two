import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet556 extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "5.56x45mm Bullet";
    this.shortName = "5.56mm Bullet";
    this.title = "Light rifle ammo";
    this.description = "Ammo for light rifles."
    this.descriptionBuy = "Ammo for light rifles."
    this.cost = new BuildCost(0.50);
    this.maxStackSize = 60;
    this.weight = 0.015; //in kilos
    this.amount = amount;
  }
}
