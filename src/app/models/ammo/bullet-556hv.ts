import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet556Hv extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "5.56x45mm High Velocity Bullet";
    this.shortName = "5.56mm HV Bullet";
    this.title = "Light rifle ammo";
    this.description = "Ammo for light rifles. High Velocity. 20% Longer range. 10% less damage."
    this.descriptionBuy = "Ammo for light rifles. Longer range. Little less damage."
    this.cost = new BuildCost(0.65);
    this.maxStackSize = 60;
    this.weight = 0.015; //in kilos
    this.amount = amount;
    this.adjustDamageFactor = 0.9;
    this.adjustRangeFactor = 1.2;
  }
}
