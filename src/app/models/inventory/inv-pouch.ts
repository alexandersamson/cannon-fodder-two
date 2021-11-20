import {Inventory} from "./inventory";

export class InvPouch extends Inventory{
  constructor(slots: number = 6) {
    super(slots);
    this.name = "Pouch";
    this.description = "A very small inventory item. Use it for keys, coins or ammo."
    this.maxItemWeight = 0.5;
    this.maxTotalWeight = 2;
    this.isInventory = true; //can be worn as inventory by the player
  }
}
