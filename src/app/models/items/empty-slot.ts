import {Item} from "./item";

export class EmptySlot extends Item{
  constructor() {
    super();
    this.name = "Empty slot";
    this.description = "Empty inventory slot to fit your valuable items in";
    this.title = '';
    this.descriptionBuy = '';
    this.maxStackSize = 0;
    this.amount = 0;
    this.isItem = false;
    this.isCosmetic = true;
    this.isAvailableSlot = true;
    this.weight = 0;
  }
}
