import {GameContainer} from "../gameplay/game-container";
import {Vector} from "../movement/vector";
import {Entity} from "../entities/entity";
import {Unit} from "../units/unit";
import {InventorySlot} from "../inventory/inventory-slot";
import {Inventory} from "../inventory/inventory";
import {Weapon} from "../weapons/weapon";
import {Ammo} from "../ammo/ammo";
import {EmptySlot} from "../items/empty-slot";
import {Item} from "../items/item";
import {Vector2d} from "../geometry/vector-2d";

export class ParseClick {
  isAttackingGround: boolean = false;
  constructor() {
  }

  clickRouter(container: GameContainer, clickPos: Vector, actingEntity: Entity | undefined, rightClick: boolean, isParsingClickedDown: boolean){
    let clickPosAbsolute = container.viewPort.getAbsolutePosOfVector(clickPos);
    if(isParsingClickedDown && this.isAttackingGround) {
      let unit = container.player.selectedEntity as Unit;
      this.handleAttackGround(container, unit, clickPosAbsolute);
      return;
    }
    let unitClicked = this.clickedOnUnit(container, clickPosAbsolute);
    if (unitClicked) {
      if(isParsingClickedDown){
        return;
      }
      //handle Lootchest clickevent
      if(actingEntity && actingEntity instanceof Unit) {
        actingEntity.interactWith(container, unitClicked)
      } else {
        unitClicked.select(container);
      }
      return;
    }
    let lootChestClicked = this.clickedOnChest(container, clickPosAbsolute);
    if (lootChestClicked) {
      if(isParsingClickedDown){
        return;
      }
      //handle Lootchest clickevent
      if(actingEntity && actingEntity instanceof Unit) {
        actingEntity.openLoot(container, lootChestClicked);
      } else {
        lootChestClicked.select();
      }
    } else {
      if(isParsingClickedDown) {
        let unit = container.player.selectedEntity as Unit;
        this.handleAttackGround(container, unit, clickPosAbsolute);
        return;
      }
    }
  }

  handleAttackGround(container: GameContainer, unit: Unit, clickPos: Vector2d){
    if(unit){
      if(unit.weapons.length){
        unit.attackGround(container, clickPos);
        this.isAttackingGround = true;
      }
    }
  }


  clickedOnChest(container: GameContainer, clickPos: Vector){
    return container.lootChests.find( lootChest => {
      return container.collision.pointIsCollidingWithEntity(this.correctClickForEntityOrigin(clickPos, lootChest), lootChest);
    })
  }

  clickedOnUnit(container: GameContainer, clickPos: Vector){
    return container.units.find( unit => {
      return container.collision.pointIsCollidingWithEntity(this.correctClickForEntityOrigin(clickPos, unit), unit);
    })
  }

  clickedOnOwnInventorySlot(container: GameContainer, actingEntity: Entity | undefined, inventory: Inventory, inventorySlotIndex: number){
    if(!inventory.inventoryItems || inventory.inventoryItems.length < 1 || inventory.inventoryItems[inventorySlotIndex].item.isAvailableSlot){
      //Do nothing
      return;
    }
    let clickedItem = inventory.inventoryItems[inventorySlotIndex].item;

    if(clickedItem instanceof Weapon){
      //TODO: Put this is a normal method. This is just for test
      if(actingEntity) {
        let unit = actingEntity as Unit;
        let oldWeapon: Item;
        if(unit.weapons[0]) {
          oldWeapon = unit.weapons.splice(0,1)[0]
        } else {
          oldWeapon = new EmptySlot();
        }
        unit.weapons[0] = clickedItem;
        clickedItem.reload(container,actingEntity as Unit)
        if(oldWeapon){ // If there's a weapon held by the player, we need to put it back in the inventory at the same spot as the equipped weapon.
          inventory.inventoryItems[inventorySlotIndex] = new InventorySlot(oldWeapon);
        }
      }
    }
    if(clickedItem instanceof Ammo){
      if(!actingEntity){
        return;
      }
      let unit = actingEntity as Unit
      if(!unit.weapons.length){
        return;
      }
      let weapon = unit.weapons[0];
      if(!weapon.magazine.itemIsAllowed(clickedItem)) {
        return;
      }
      weapon.magazine.swapItems(
        container,
        inventory,
        inventorySlotIndex,
        weapon.magazine,
        0
      )
    }
  }


  //This function corrects the click position for entity origins, that shifts the location of the entity upon canvas draw
  correctClickForEntityOrigin(clickPos: Vector, entity: Entity): Vector{
    return new Vector(
      clickPos.x + entity.origin.x,
      clickPos.y + entity.origin.y,
      clickPos.z + entity.origin.z,
    );
  }
}
