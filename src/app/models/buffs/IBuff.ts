import {PropertyAdjustment} from "./modifiers/property-adjustment";

export interface IBuff {
  adjustment: PropertyAdjustment;
  timerSet: number;
  timerCurrent: number;
  paused: boolean;
  getBuffAdjustment(framerate: number, basePropertyValue: number, level: number): number
}
