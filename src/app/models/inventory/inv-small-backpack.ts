import {Inventory} from "./inventory";

export class InvSmallBackpack extends Inventory{
  constructor(slots: number = 10) {
    super(slots);
    this.name = "Small Backpack";
    this.description = "A small backpack."
    this.isInventory = true; //can be worn as inventory by the player
  }
}
