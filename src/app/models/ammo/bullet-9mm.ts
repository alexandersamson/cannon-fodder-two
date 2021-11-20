import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet9mm extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "9mm Bullet";
    this.title = "Standard pistol ammo";
    this.description = "Ammo for the 9mm Pistol."
    this.descriptionBuy = "Ammo for the 9mm Pistol."
    this.cost = new BuildCost(0.20);
    this.maxStackSize = 90;
    this.weight = 0.01; //in kilos
    this.amount = amount;
    this.adjustDamageAmount = 0; //0 is normal
    this.adjustDamageFactor = 1; //1 is normal
  }
}
