import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet50calAe extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = ".50 (12.7mm) Action Express";
    this.shortName = ".50 AE Bullet";
    this.title = "High caliber pistol ammo";
    this.description = "Ammo for .50 caliber pistols."
    this.descriptionBuy = "Ammo for .50 caliber pistols."
    this.cost = new BuildCost(0.40);
    this.maxStackSize = 60;
    this.weight = 0.02; //in kilos
    this.amount = amount;
    this.adjustDamageAmount = 0; //0 is normal
    this.adjustDamageFactor = 1; //1 is normal
  }
}
