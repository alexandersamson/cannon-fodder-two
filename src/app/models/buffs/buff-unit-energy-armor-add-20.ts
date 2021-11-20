import {Buff} from "./buff";
import {Entity} from "../entities/entity";
import {IBuffPropertyValueNumber} from "./IBuff-property-value-number";

export class BuffUnitEnergyArmorAdd20 extends Buff implements IBuffPropertyValueNumber{
  constructor() {
    super();
    this.name = "Buff";
    this.title = "Buff";
    this.type = "Buff";
    this.description = "A buff is a unit property modifier, mostly caused by weapons, items or effects"

    //Adjustments
    this.adjustment.adjustmentAmount = 20;
    this.adjustment.adjustmentFactor = 1;
    this.adjustment.levelAdjustmentAmount = 0;
    this.adjustment.levelAdjustmentFactor = 1;

  }

  setBuffedPropertyValue(framerate: number, entity:Entity) {
    let basePropertyValue = entity.lifeProperties.spMaxBase;
    entity.lifeProperties.spMax += super.getBuffAdjustment(framerate, basePropertyValue, entity.level);
  }

}
