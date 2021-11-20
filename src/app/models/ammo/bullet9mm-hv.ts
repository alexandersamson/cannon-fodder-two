import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet9mmHv extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "9mm High Velocity Bullet";
    this.shortName = "9mm HV Bullet";
    this.title = "High Velocity 9mm Pistol ammo";
    this.description = "Ammo for the 9mm Pistol. High Velocity, longer range. Little less damage."
    this.descriptionBuy = "Ammo for the 9mm Pistol, High Velocity, longer range. Little less damage."
    this.cost = new BuildCost(0.30);
    this.maxStackSize = 90;
    this.weight = 0.01; //in kilos
    this.amount = amount;
    this.adjustDamageAmount = 0; //0 is normal
    this.adjustDamageFactor = 0.9; //1 is normal
    this.adjustRangeAmount = 0; // 0 is normal
    this.adjustRangeFactor = 1.25 // 1 is normal
  }
}
