import {ArmorClass} from "./armor-class";
import {MovementZones} from "./movement-zones";

export class ItemUnarmored extends ArmorClass {
  constructor() {
    super();
    this.name = "Unarmored Item";
    this.title = "Unarmored Item";
    this.description = "An item made of simple materials.";
    this.movementZones = [MovementZones.ALL];
  }
}
