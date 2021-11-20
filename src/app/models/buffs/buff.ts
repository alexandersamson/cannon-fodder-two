import {GenericProperties} from "../generic-properties";
import {PropertyAdjustment} from "./modifiers/property-adjustment";
import {IBuff} from "./IBuff";

export class Buff extends GenericProperties implements IBuff{
  adjustment: PropertyAdjustment = new PropertyAdjustment();
  timerSet: number = 0;
  timerCurrent: number = 0;
  paused:boolean = false;
  constructor() {
    super();
    this.name = "Buff";
    this.title = "Buff";
    this.type = "Buff";
    this.description = "A buff is a unit property modifier, mostly caused by weapons, items or effects"
  }

  getBuffAdjustment(framerate: number, basePropertyValue: number, level: number = 1){
    if(this.paused){
      return 0;
    }
    if(this.timerSet !== 0) {
      this.timerCurrent = Math.max(0, this.timerCurrent -= (1000 / framerate))
    }
    if(this.timerSet !== 0 && this.timerCurrent === 0){
      return 0;
    }
    return this.adjustment.getAdjustment(basePropertyValue, level);
  }

}
