import {Entity} from "../entities/entity";
import {PropertyAdjustment} from "./modifiers/property-adjustment";

export interface IBuffPropertyValueNumber {
  adjustment: PropertyAdjustment;
  timerSet: number;
  timerCurrent: number;
  paused: boolean;
  setBuffedPropertyValue(framerate: number, entity:Entity): void;
}
