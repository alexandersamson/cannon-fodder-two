import {GenericPropertiesLean} from "../generic-properties-lean";
import {MovementZone} from "./movement-zone";
import {MovementZones} from "./movement-zones";

export class ArmorClass extends GenericPropertiesLean {
  damageFactorGlobal: number;
  movementZones: Array<MovementZone>;
  constructor() {
    super();
    this.damageFactorGlobal = 1;
    this.movementZones = [MovementZones.LAND];
  }
}
