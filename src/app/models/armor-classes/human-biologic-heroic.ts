import {ArmorClass} from "./armor-class";
import {MovementZones} from "./movement-zones";

export class HumanBiologicHeroic extends ArmorClass {
  constructor() {
    super();
    this.name = "Heroic Person";
    this.title = "Heavily armored human being";
    this.description = "A human being wearing some epic body armor.";
    this.movementZones = [MovementZones.LAND];
  }
}
