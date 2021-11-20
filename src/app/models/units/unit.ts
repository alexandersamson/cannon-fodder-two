import {Tool} from "../tools/tool";
import {Ability} from "../abilities/ability";
import { Inventory } from "../inventory/inventory";
import {Weapon} from "../weapons/weapon";
import {Entity} from "../entities/entity";
import {Item} from "../items/item";
import {UnitAi} from "../game-ai/unit-ai";
import {Vector} from "../movement/vector";
import {GameContainer} from "../gameplay/game-container";
import {PlayerAi} from "../game-ai/player-ai";
import {Sprite} from "../sprites/sprite";
import {ISpriteUnit} from "../sprites/ISprite-unit";
import {InvLootChest} from "../inventory/loot-chests/inv-loot-chest";
import {EmptySlot} from "../items/empty-slot";
import {InventorySlot} from "../inventory/inventory-slot";
import {Vector2d} from "../geometry/vector-2d";

export class Unit extends Entity{
  weapons: Array<Weapon>;
  maxWeapons: number;
  shields: Array<Tool>;
  maxShields: number;
  tools: Array<Tool>;
  maxTools: number;
  inventories: Array<Inventory>;
  maxInventories: number;
  abilities: Array<Ability>;
  usesAi: Array<UnitAi|PlayerAi>;
  spawnPoint: Vector;

  constructor(sprite: Sprite | undefined) {
    super(sprite);
    this.name = 'A Unit';
    this.title = 'Unit';
    this.type = 'Unit';
    this.descriptionBuy = 'Unit (Buy)';
    this.description = 'Unit';
    this.weapons = [];
    this.maxWeapons = 2;
    this.shields = [];
    this.maxShields = 1;
    this.tools = [];
    this.maxTools = 2;
    this.inventories = [];
    this.maxInventories = 2;
    this.abilities = [];
    this.lifeProperties.hp = 100; // default HP for human beings
    this.weight = 75; // default weight for human beings
    this.usesAi = [];
    this.spawnPoint = new Vector();
    this.size = new Vector(24,24,24);

  }

  runAi(container: GameContainer){
    if(!this.usesAi.length){
      return
    }
    this.usesAi.forEach(ai => {
      ai.runAi(container, this);
    })
  }

  interactWith(container: GameContainer, targetEntity: Entity){
    if(targetEntity instanceof Unit){
      let thisUnit = this as unknown as Unit;
      if(thisUnit.faction.isHostile(targetEntity) && thisUnit.faction.isAllowedToTargetFactionMember(thisUnit, targetEntity)){
        thisUnit.movement.getInRangeOf(targetEntity, thisUnit.weapons[0]?.projectile.maxEffectiveRange ?? thisUnit.interactionRange);
        thisUnit.attack(container, targetEntity);
      }
    }
  }

  precheckAttack<T extends Entity | Vector2d | Vector>(target: T){
    if(target instanceof Entity) {
      if (!target.lifeProperties.isAlive || !this.faction.isAllowedToTargetFactionMember(this, target) || !this.canOperate(this)) {
        this.isAttacking = false;
        this.target = undefined;
        return false;
      }
    } else {
      if (!this.canOperate(this)) {
        this.isAttacking = false;
        this.target = undefined;
        return false;
      }
    }
    return true
  }

  attackGround<T extends Vector | Vector2d>(container: GameContainer, target: T){
    if(!this.precheckAttack(target)){
      return;
    }
    let dummy: Entity | undefined = new Entity(undefined, true);
    dummy.movement.curPos = target as Vector;
    this.attack(container, dummy);
    dummy.destroy(container);
  }

  attack<T extends Unit | Item | Entity>(container: GameContainer, target: T){
    if(!this.precheckAttack(target)){
      return;
    }
    this.target = target;
    for (const weapon of this.weapons){
      if(target instanceof Unit || target instanceof Entity) {
        if (weapon.useOnTargetUnit(container, this, target as Unit)) {
          this.faction.processFactionRelatioshipStatus(this, target);
          if(weapon.fxAttackChannel.length > 0){
            weapon.fxAttackChannel.forEach(effect => {
              this.isAttacking = true;
              this.movement.faceToTarget(target.movement.curPos);
              this.pushLineEffect(container, effect, this, target);
            });
          }
          break;
        } else {
          //console.log('Attack failed. Looking for another weapon...');
        }
      }
    }
    return true;
  }

  stop(){
    this.isAttacking = false;
    this.movement.stop();
  }


  openLoot(container: GameContainer, lootContainer: InvLootChest){
    if(!lootContainer.isLootChest || lootContainer.isCosmetic){
      console.log("Cannot open this chest!");
      return;
    }
    if(Math.hypot(this.movement.curPos.x - lootContainer.movement.curPos.x, this.movement.curPos.y - lootContainer.movement.curPos.y) > this.interactionRange){
      console.log("Too far away");
      this.movement.getInRangeOf(lootContainer, this.interactionRange)
      return;
    }
    if(lootContainer.isLocked){
      console.log("Is locked");
      lootContainer.unlock(container, lootContainer)
      return;
    }
    lootContainer.isOpen = true;
    //console.log("Opened Chest")
    if(this.weapons.length < 1){
      let foundWeaponsIndexes = lootContainer.getItemSlotsByItemTypeIndexes(new Weapon());
      console.log(foundWeaponsIndexes);
      if(foundWeaponsIndexes.length > 0) {
        this.weapons[0] = lootContainer.inventoryItems[foundWeaponsIndexes[0]].item as Weapon;
        lootContainer.inventoryItems[foundWeaponsIndexes[0]] = new InventorySlot(new EmptySlot());
        this.weapons[0].reload(container, this);
      }
    }
    if(this.inventories.length > 0) {
      for(let inventory of this.inventories) {
        inventory.acquireAllItemsFromInventory(lootContainer);
        //Check if after the first iteration if there are still items to place in other inventory slots. If not, break the loop.
        if(lootContainer.getItemSlotsAmount() < 1){
          container.sounds.add('inventory/inventory-bag-insert');
          break;
        }
      }
    }
    console.log(lootContainer);
  }


  prepareToDrawUnitSprite(container: GameContainer, ctx: CanvasRenderingContext2D) {
    let sprite = this.sprite as ISpriteUnit
    let spriteVariation = sprite.spriteVariants.idle;

    if(this.movement.isMoving()){
      if(sprite.spriteVariants.running) {
        spriteVariation = sprite.spriteVariants.running;
      }
    } else if (this.isAttacking){
      if(sprite.spriteVariants.attacking) {
        spriteVariation = sprite.spriteVariants.attacking;
      }
    }
    super.prepareToDrawEntitySprite(container, ctx, spriteVariation);
  }




}
