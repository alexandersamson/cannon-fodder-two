import {Inventory} from "../inventory";
import {SpriteLootChest} from "../../sprites/items/loot-chests/sprite-loot-chest";
import {GameContainer} from "../../gameplay/game-container";
import {InventorySlot} from "../inventory-slot";
import {Vector} from "../../movement/vector";

export class InvLootChest extends Inventory{
  constructor(container: GameContainer, slots: number = 10, inventoryItems: InventorySlot[] = []) {
    let sprite = new SpriteLootChest(container)
    super(slots, sprite);

    this.name = "Chest with loot";
    this.description = "A chest, possibly filled with loot."
    this.canBePickedUp = false; //Chests cannot be picked up
    this.canTakeInItems = false; //In general it's not possible to keep world generated chests as some kind of external storage for players.
    this.canProvideItems = true; //A chest is an item-provider
    this.isInventory = false; //can't be worn as inventory by the player
    this.isLootChest = true; //Yes, this is a loot chest.
    this.removesWhenEmpty = true;
    this.showContentsText = true; // Yes, show the contents on the game canvas
    this.inventoryItems = inventoryItems;
    this.size = new Vector(24,24,0);
  }



  select(){
    //Do something
  }

  unlock(container: GameContainer, lootChest: Inventory){

  }

}
