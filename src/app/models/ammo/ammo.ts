import {Item} from "../items/item";

export class Ammo extends Item{
  adjustDamageFactor: number;
  adjustDamageAmount: number;
  adjustRangeAmount: number;
  adjustRangeFactor: number;
  adjustAccuracyAmount: number;
  adjustAccuracyFactor: number;
  adjustCritChanceAmount: number;
  adjustCritChanceFactor: number;
  adjustCritFactorAmount: number;
  adjustCritFactorFactor: number;
  constructor() {
    super();
    this.isAmmo = true;
    this.maxStackSize = 30;
    this.weight = 0.02;
    this.adjustDamageAmount = 0; //1 is normal
    this.adjustDamageFactor = 1; //1 is normal
    this.adjustRangeAmount = 0; //0 is normal
    this.adjustRangeFactor = 1; //1 is normal
    this.adjustAccuracyAmount = 0; //0 is normal
    this.adjustAccuracyFactor = 0; //0 is normal
    this.adjustCritChanceAmount = 0; //0 is normal
    this.adjustCritChanceFactor = 1; //1 is normal
    this.adjustCritFactorAmount = 0; //0 is normal
    this.adjustCritFactorFactor = 1; //1 is normal
  }

  getDamageAdjustment(damage: number):number{
    return ((damage + this.adjustDamageAmount) * this.adjustDamageFactor) - damage;
  }

  getRangeAdjustment(range: number):number{
    return ((range + this.adjustRangeAmount) * this.adjustRangeFactor) - range;
  }

  getAccuracyAdjustment(accuracy: number):number{
    let newAccuracy = ((1-(accuracy+this.adjustAccuracyAmount))*this.adjustAccuracyFactor);
    if(newAccuracy + accuracy > 1){
      return 1-accuracy; //to prevent strange behaviour
    }
    if(newAccuracy + accuracy < 0){
      return -accuracy; //to prevent strange behaviour
    }
    return newAccuracy;
  }

  getCritChanceAdjustment(critchance: number):number{
    return ((critchance + this.adjustCritChanceAmount) * this.adjustCritChanceFactor) - critchance;
  }

  getCritFactorAdjustment(critfactor: number):number{
    return ((critfactor + this.adjustCritFactorAmount) * this.adjustCritFactorFactor) - critfactor;
  }
}
