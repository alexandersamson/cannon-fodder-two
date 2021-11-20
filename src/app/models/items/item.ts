import {BuildCost} from "../build-cost";
import {Ability} from "../abilities/ability";
import {EntityLifeProperties} from "../entities/entity-life-properties";
import {Entity} from "../entities/entity";
import {ArmorClass} from "../armor-classes/armor-class";
import {Sprite} from "../sprites/sprite";
import {GameContainer} from "../gameplay/game-container";
import {InvLootChest} from "../inventory/loot-chests/inv-loot-chest";
import {ISpriteItem} from "../sprites/ISprite-item";
import {SpriteVariant} from "../sprites/sprite-variant";

export class Item extends Entity{
  amount:number;
  maxStackSize:number;
  isTool: boolean;
  isWeapon: boolean;
  isShield: boolean;
  isItem: boolean;
  isAmmo: boolean;
  isArmor: boolean;
  isInventory: boolean; //Can it be equiped as 'Inventory' by units?
  isLootChest: boolean; //Special type of Inventory, which cannot be equipped by units.
  isCosmetic: boolean;
  restrictUseToOwnFaction: boolean;
  allowUseByFriendlyFaction: boolean;
  allowUseByNeutralFaction: boolean;
  allowUseByHostileFaction: boolean;
  bindToOwnFactionOnPickup: boolean;
  bindToOwnerOnPickup: boolean;
  //Inventory
  isAvailableSlot: boolean;
  canBePickedUp:boolean;
  canBeStashed:boolean; //can this item fit in a bag/chest/inventory?
  canActivate: boolean;
  consumesPerActivation: number;
  isActivated: boolean;
  activateDuration: number;
  activateDurationLeft: number;
  passiveAbilities: Array<Ability>;
  activeAbilities: Array<Ability>;
  disabledAbilitiesWhenActive: Array<Ability>;
  constructor(sprite: Sprite | undefined = undefined) {
    super(sprite);
    this.level = 1;
    this.rarityLevel = 0;
    this.cost = new BuildCost(0);
    this.sellCostFactor = 0.5;
    this.canSell = true;
    this.canBePickedUp = true; //This must be true for most of the in-game items
    this.canBeStashed = true; // should be for the most items.
    this.amount = 1;
    this.maxStackSize = 1;
    this.iconShowStackAmount = true; //
    this.lifeProperties = new EntityLifeProperties();
    this.lifeProperties.armorClass = new ArmorClass()
    this.durability = null; // generic items usually don't have any durability
    this.isTool = false;
    this.isWeapon = false;
    this.isShield = false;
    this.isItem = true;
    this.isAmmo = false;
    this.isArmor = false;
    this.isInventory = false;
    this.isLootChest = false;
    this.isCosmetic = false;
    this.isAvailableSlot = false;
    this.canActivate = false;
    this.consumesPerActivation = 0;
    this.isActivated = false;
    this.activateDuration = 0;
    this.activateDurationLeft = 0;
    this.passiveAbilities = [];
    this.activeAbilities = [];
    this.disabledAbilitiesWhenActive =[];

    this.restrictUseToOwnFaction = false;
    this.allowUseByFriendlyFaction = true;
    this.allowUseByNeutralFaction = false;
    this.allowUseByHostileFaction = false;
    this.bindToOwnFactionOnPickup = false;
    this.bindToOwnerOnPickup = false;
  }

  prepareToDrawItemSprite(container: GameContainer, ctx: CanvasRenderingContext2D) {
    let sprite = this.sprite as ISpriteItem
    let spriteVariation: SpriteVariant | undefined;

    if(this.isLootChest){
      let item = this as unknown as InvLootChest;
      if(item.isOpen) {
        spriteVariation = sprite.spriteVariants.open;
      } else if(item.isLocked){
        spriteVariation = sprite.spriteVariants.locked;
      } else {
        spriteVariation = sprite.spriteVariants.idle;
      }
    }
    else {
      spriteVariation = undefined
    }
    super.prepareToDrawEntitySprite(container, ctx, spriteVariation);
  }
}
