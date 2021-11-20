import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class BulletBmg50 extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = ".50 BMG (12,7x99mm) Bullet";
    this.shortName = ".50 BMG Bullet"
    this.title = "Heavy rifle ammo";
    this.description = "Ammo for heavy rifles."
    this.descriptionBuy = "Ammo for heavy rifles. Reasonably priced for serious damage."
    this.cost = new BuildCost(5);
    this.maxStackSize = 10;
    this.weight = 0.110; //in kilos
    this.amount = amount;
  }
}
