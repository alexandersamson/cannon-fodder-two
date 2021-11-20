import {Item} from "../items/item";
import {EmptySlot} from "../items/empty-slot";
import {GenericPropertiesLean} from "../generic-properties-lean";

export class InventorySlot extends GenericPropertiesLean{
  position: number;
  blocked: boolean;
  item: Item;
  constructor(item:Item = new EmptySlot()) {
    super();
    this.position = 0;
    this.blocked = false;
    this.item = item;
    //The item amount can be set via the item constructor itself
  }
}
