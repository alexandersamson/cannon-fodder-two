import {BuildCost} from "../build-cost";
import {Ammo} from "./ammo";

export class Bullet9mmHp extends Ammo{

  constructor(amount: number = 1) {
    super();
    this.name = "9mm High Precision Bullet";
    this.shortName = "9mm HP Bullet";
    this.title = "High Precision 9mm Pistol ammo";
    this.description = "Ammo for the 9mm Pistol. High Precision means more accuracy."
    this.descriptionBuy = "Ammo for the 9mm Pistol, High Precision means more accuracy."
    this.cost = new BuildCost(0.30);
    this.maxStackSize = 90;
    this.weight = 0.01; //in kilos
    this.amount = amount;
    this.adjustAccuracyFactor = 0.5 //makes 0.875 from 0.75 (0.75 + ((1-0.75) * 0,50) = 0,875)
  }
}
