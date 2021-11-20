import {ArmorClass} from "./armor-class";
import {MovementZones} from "./movement-zones";

export class HumanBiologicArmored extends ArmorClass {
  constructor() {
    super();
    this.name = "Armored Person";
    this.title = "Armored human being";
    this.description = "A human being wearing proper body armor.";
    this.movementZones = [MovementZones.LAND];
  }
}
