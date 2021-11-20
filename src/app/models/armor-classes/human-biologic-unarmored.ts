import {ArmorClass} from "./armor-class";
import {MovementZones} from "./movement-zones";

export class HumanBiologicUnarmored extends ArmorClass {
  constructor() {
    super();
    this.name = "Unarmored Person";
    this.title = "Unarmored human being";
    this.description = "A human being of flesh and blood.";
    this.movementZones = [MovementZones.LAND];
  }
}
