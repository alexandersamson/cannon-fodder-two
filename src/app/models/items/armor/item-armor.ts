import {Item} from "../item";

export class ItemArmor extends Item{
  constructor() {
    super();
    this.maxStackSize = 1;
    this.isArmor = true;
  }
}
