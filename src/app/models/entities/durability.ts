import {Unit} from "../units/unit";
import {Entity} from "./entity";

export class Durability{
  amountCurrent: number = 100;
  amountMax: number = 100;
  amountLossPerUse: number = 1; //for usable items
  amountLossPerMeter: number = 0; //for movable objects
  repairable: boolean = false;
  repairableBy: Array<Unit> = [];
  repairPerSecond: number = 5;
  repairCostFactor: number = 0.25;
  removeWhenBroken: boolean = false; //removes the entity entirely when broken
  killWhenBroken: boolean = false; // kills the entity when broken
  disableWhenBroken: boolean = true; //inactivates the entity when broken. Like a tool cannot be used and a unit cannot move/work/fight.
  constructor() {
  }

  setOwnInitDurabilityAmount(amount: number = 100){
    this.amountMax = amount;
    this.amountCurrent = amount;
  }

  use<T extends Entity>(entity: T):boolean{
    if(!entity.durability) { return true }

    entity.durability.amountCurrent -= entity.durability.amountLossPerUse;
    this.checkIfBroken(entity);
    return true;
  }

  move<T extends Entity>(entity: T, distance: number = 1):boolean{
    if (!entity.durability){ return true }

    entity.durability.amountCurrent -= entity.durability.amountLossPerMeter * distance;
    this.checkIfBroken(entity);
    return true;
  }


  checkIfBroken<T extends Entity>(entity: T){
    if (!entity.durability){ return false }

    if(entity.durability.amountCurrent <= 0){
      this.handleBroken(entity)
      return true;
    }
    return false; //false because: not broken
  }


  handleBroken<T extends Entity>(entity: T):boolean{
    if (!entity.durability){ return true }

    if(entity.durability.killWhenBroken){
      entity.lifeProperties.kill(entity);
    }
    if(entity.durability.disableWhenBroken){
      entity.lifeProperties.disable(entity);
    }
    return true;

  }
}
