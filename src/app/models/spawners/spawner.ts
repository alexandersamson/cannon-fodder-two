import {Vector} from "../movement/vector";
import {Unit} from "../units/unit";
import {Weapon} from "../weapons/weapon";
import {VectorSpawnDefault} from "../movement/vector-spawn-default";
import {Inventory} from "../inventory/inventory";
import {Ammo} from "../ammo/ammo";
import {Faction} from "../factions/faction";
import {FactionNotAssigned} from "../factions/faction-not-assigned";
import {InvSmallBackpack} from "../inventory/inv-small-backpack";
import {GameContainer} from "../gameplay/game-container";
import {Item} from "../items/item";
import {InventorySlot} from "../inventory/inventory-slot";
import {InvLootChest} from "../inventory/loot-chests/inv-loot-chest";
import {Commodity} from "../commodities/commodity";

export class Spawner{
  unit: Unit;
  orderMoveTo: Array<Vector> = [];
  container: GameContainer;


  constructor(
    container: GameContainer,
    unit: Unit,
    faction: Faction = new FactionNotAssigned(),
    location: Vector = new VectorSpawnDefault(),
    orderMoveTo: Array<Vector> = [],
    orderAttackEntity: Unit | Item | undefined,
    bags: Inventory | Array<Inventory> | undefined,
    weapons: Weapon | Array<Weapon> | undefined,
    ammo: Ammo | Array<Ammo> | undefined,
    cash: Commodity | Array<Ammo> | undefined,
    lootDrop: InventorySlot | Array<InventorySlot> | undefined,

    ) {
    this.container = container;
    this.unit = unit;
    this.unit.movement.curPos = {...location};
    //console.log(this.movement.curPos);
    //console.log(container.viewPort.curPos);
    this.orderMoveTo = orderMoveTo;
    if(Array.isArray(bags)){
      this.unit.inventories = bags;
    } else if(bags)  {
      this.unit.inventories.push(bags);
    }
    if(Array.isArray(weapons)){
      this.unit.weapons = weapons;
    } else if(weapons) {
      this.unit.weapons.push(weapons);
    }
    this.unit.spawnPoint = {...this.unit.movement.curPos};
    this.giveAmmo(ammo);
    this.loadWeapons();

    //prepare default loot drop with ammo
    this.prepareLootDropChest(container, ammo, lootDrop)

    //run the ai
    this.unit.runAi(container);
    this.orderMove();
    this.orderAttack(orderAttackEntity);
    this.container.units.push(this.unit);
  }

  giveAmmo(ammo: Ammo | Array<Ammo> | undefined){
    if(ammo){
      if(this.unit.inventories.length < 1){
        this.unit.inventories.push(new InvSmallBackpack()); //Need to have a bag of some sort
      }
      if(Array.isArray(ammo)){
        ammo.forEach(ammoStack => {
          this.unit.inventories[0].insertItemStack(ammoStack);
        })
      } else {
        this.unit.inventories[0].insertItemStack(ammo);
      }
    }
  }

  loadWeapons(){
    this.unit.weapons.forEach(weapon => {
      weapon.reload(this.container, this.unit)
    })
  }

  prepareLootDropChest(container: GameContainer, ammo: Ammo | Array<Ammo> | undefined, lootDrop: InventorySlot | Array<InventorySlot> | undefined){
    if(!lootDrop){
      return;
    }
    let chestSize = 0;
    let itemSlots: Array<InventorySlot> = [];
    if(Array.isArray(lootDrop)){
      lootDrop.forEach(drop => {
        chestSize +=1;
        itemSlots.push(drop);
      })
    } else {
      chestSize +=1;
      itemSlots.push(lootDrop);
    }
    let dropChest = new InvLootChest(container, chestSize, itemSlots);
    this.unit.lootDropChests.push(dropChest);
  }

  orderMove() {
    if (this.orderMoveTo.length) {
      this.unit.movement.moveWaypoints = this.orderMoveTo;
    } else {
      this.unit.movement.moveWaypoints = [];
    }
  }

  orderAttack(entity: Unit | Item | undefined){
    if(entity){
      this.unit.attack(this.container, entity);
    }
  }
}
