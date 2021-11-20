import {Tool} from "../tools/tool";
import {Ammo} from "../ammo/ammo";
import {Inventory} from "../inventory/inventory";
import {Unit} from "../units/unit";
import {Entity} from "../entities/entity";
import {EmptySlot} from "../items/empty-slot";
import {Item} from "../items/item";
import {InvWeaponMagazine} from "../inventory/inv-weapon-magazine";
import {Vector} from "../movement/vector";
import {GameContainer} from "../gameplay/game-container";
import {Projectile} from "../projectiles/projectile";

export class Weapon extends Tool{
  projectile: Projectile;
  usableAmmo: Array<Ammo>;
  magazine: InvWeaponMagazine;

  ammoPerUse: number;


  constructor() {
    super();
    this.name = 'Weapon';
    this.type = 'Weapon';
    this.description = 'A weapon to inflict damage with.';
    this.descriptionBuy = 'A weapon to inflict damage with.'
    this.isWeapon = true;
    this.projectile = new Projectile();
    this.usableAmmo = [];
    this.magazine = new InvWeaponMagazine(30);
    this.ammoPerUse = 0;
    this.loadTimeLeft = 0;
    this.loadTimeSet = 1500;
  }


  public getCalculatedWeaponRange():number{
    let range = this.projectile.maxEffectiveRange
    let ammo = this.getLoadedAmmoObj();
    if(ammo != null && ammo instanceof Ammo){
      range += ammo.getRangeAdjustment(range);
    }
    return range;
  }

  public getCalculatedWeaponAccuracy(source: Entity | undefined = undefined):number{
    let accuracy: number = 0;
    let count: number = 0;
    if (source && source.movement.isMoving()) {
      accuracy += this.projectile.damageOnImpact.accuracyWhileMoving;
    } else {
      accuracy += this.projectile.damageOnImpact.accuracy;
    }
    let ammo = this.getLoadedAmmoObj();
    if(ammo != null && ammo instanceof Ammo){
      accuracy += ammo.getAccuracyAdjustment(accuracy);
    }
    return accuracy;
  }

  targetIsInRange<S extends Entity, T extends Entity>(source: S, target: T){
    const a = source.movement.curPos.x - target.movement.curPos.x;
    const b = source.movement.curPos.y - target.movement.curPos.y;
    const c = Math.sqrt( a*a + b*b );
    return this.getCalculatedWeaponRange() >= c;
  }


  public getCalculatedWeaponDamage(dmg: number = 0):number{
    let damage:number = dmg;
    let ammo = this.getLoadedAmmoObj();
    if(ammo != null && ammo instanceof Ammo){
      damage += ammo.getDamageAdjustment(damage);
    }
    return damage as number;
  }


  //CALLING RELOAD ON THIS WEAPON
  public reload<S extends Unit>(container: GameContainer, unit: S, sourceInventory: Inventory | undefined = undefined, sourceItemIndex: number | undefined = undefined){
    if(this.loadTimeLeft > 0){
      return false; //Cannot reload yet
    }
    if(unit.inventories.length < 1){
      //console.log("["+unit.name+"]" + " has no inventories to search for ammo.");
      return false;
    }
    if(sourceInventory && sourceItemIndex && this.magazine && this.magazine.inventoryItems.length > 0){
      return (this.magazine.swapItems(
        container,
        sourceInventory,
        sourceItemIndex,
        this.magazine,
        0));
    }
    for(let inventory of unit.inventories){
      if(this.reloadFromInventory(inventory)){
        super.load(container, this);
        return true;
      }
    }
    //console.log("["+unit.name+"]" + " has no suitable ammo for this weapon ["+this.name+"].");
    return false;
  }



  // AUTOMATIC RELOADING WEAPON FROM AN INVENTORY
  public reloadFromInventory<T extends Inventory>(inventory: T){

    //SOME PRELOAD CHECKS
    if(this.ammoPerUse < 1){
      console.log("["+this.name+"]" + " does not require any ammo.");
      return true;
    }
    if(this.usableAmmo.length < 1){
      console.log("["+this.name+"]" + " requires ammo, but cannot be loaded with any ammo.");
      return false;
    }
    if(!this.magazine){
      console.log("["+this.name+"]" + " requires ammo, but has no magazine to put the ammo in.");
      return false;
    }
    if(this.magIsFull()){
      console.log("["+this.name+"]" + " already has a full magazine.");
      return true;
    }
    //console.log(inventory.name);

    //GET TYPE OF AMMO IF ALREADY EXISTS
    let loadAmount: number|null;
    let ammoObj: Item|null;
    if(this.magIsLoaded() || this.magHasAssignedAmmo()){
      ammoObj = this.getLoadedAmmoObj();
      if(ammoObj instanceof Ammo){
        loadAmount = this.getReloadAmount();
        if(loadAmount !== null && loadAmount > 0){
          //We got a valid Ammo object and a Loadamount
          if (this.findAmmoInInventory(inventory, ammoObj, loadAmount)){
            //Loaded
            return true;
          }
        }
      }
    }

    //If the method gets to this point, we can assume that there are no existing projectiles of the same type available.
    //So, now we can safely remove the bullet type from the magazine, if it's empty
    if(this.magHasAssignedAmmo()){
      this.magazine.resetSlotIfEmpty(0);
    }

    //IF THERE'S NO AMMO EXISTENT, WE NEED TO ITERATE OVER USABLE AMMO TYPES
    let magazine = this.magazine;
    loadAmount = magazine.maxItemStackSize;
    for(const ammoObj of this.usableAmmo){
      if(this.findAmmoInInventory(inventory, ammoObj, loadAmount)){
        return true;
      }
    }

    //IF THERE'S NOTHING INSERTED
    //console.log(this.name + "could not be loaded.");
    return false;
  }


  public findAmmoInInventory(inventory: Inventory, ammo: Ammo, amount: number){
    let foundItemSlotIndex = inventory.inventoryItems.findIndex(itemSlotIndex => {
      //console.log(itemSlot.item);
      //console.log(ammo.constructor);
      return ((itemSlotIndex.item instanceof ammo.constructor) && (itemSlotIndex.item.amount > 0));
    })
    if(foundItemSlotIndex !== -1){
      //console.log(inventory.inventoryItems[foundItemSlotIndex].item);
      if(this.magazine) {
        if(this.magazine.itemIsAllowed(inventory.inventoryItems[foundItemSlotIndex].item)){
          let amountProvided = inventory.inventoryItems[foundItemSlotIndex].item.amount;
          let returnItemSlot = this.magazine.insertItemStack(inventory.inventoryItems[foundItemSlotIndex].item);
          let amountLoaded = returnItemSlot.item.isAvailableSlot ? amountProvided : amountProvided - returnItemSlot.item.amount;
          inventory.resetSlotIfEmpty(foundItemSlotIndex);
          //console.log("AMOUNT LOADED: "+amountLoaded);
          if(amountLoaded > 0){
            this.magazine.resetSlotIfEmpty(foundItemSlotIndex);
            //console.log("Weapon loaded.")
            return true;
          } else {
            //console.log("Found usable ammo, it fits in the magazine, but for some strange reason the ammo would not insert.");
          }
        } else {
          //console.log("Found usable ammo, but it does not fit in the current weapons' magazine.");
        }
      } else {
        //console.log("Couldn't find a magazine for this weapon.");
      }
    }
    //console.log(inventory);
    //console.log("Could not find requested ammo ["+ammo.name+"] in the inventory ["+inventory.name+"].");
    return false;
  }

  public magIsFull():boolean{
    return this.getReloadAmount() === 0;
  }

  public magIsLoaded():boolean{
    if(!this.magazine){
      return false;
    }
    if(this.magazine.inventoryItems[0].item instanceof EmptySlot){
      return false;
    }
    return this.magazine.inventoryItems[0].item.amount >= 1;
  }

  public magHasAssignedAmmo():boolean{
    if(!this.magazine){
      return false;
    }
    return !(this.magazine.inventoryItems[0].item instanceof EmptySlot);
  }

  public getAmmoLeftInMag(){
    if(!this.magIsLoaded()){
      return 0;
    }
    if(this.magazine) {
      return this.magazine.inventoryItems[0].item.amount;
    }
    return 0;
  }

  public getReloadAmount():number|null{
    if(this.magazine) {
      let amount = this.magazine.maxItemStackSize - this.magazine.inventoryItems[0].item.amount;
      //console.log("Reload amount requested: "+amount);
      return amount >= 0 ? amount : 0;
    }
    return null;
  }

  public getLoadedAmmoObj():Item|null{
    if(this.magazine) {
      return this.magazine.inventoryItems[0].item as Item;
    }
    return null;
  }

  public useWithoutTarget(container: GameContainer, unit: Unit | null = null):boolean {
    if (!this.canOperate(this)){
      //console.log(this.name + " cannot be used: No durability left on weapon.");
      return false;
    }
    if(!this.processReload(container, <Unit>unit)){
      return false;
    }
    if(this.isCoolingDown()){
      //console.log(this.name + " cannot be used: Cooling down.");
      return false;
    }
    this.durability?.use(this);
    super.use(container, this, unit as Unit, new Entity());
    this.addCooldown();
    //console.log("Used weapon ["+this.name+"] without a target.")
    return true;
  }



  public useOnTargetUnit<S extends Unit, T extends Unit>(container: GameContainer, source: S, target: T){
    if (!this.canOperate(this)){
      return false;
    }
    if(!this.processReload(container, source)){
      return false;
    }
    if(!this.targetIsInRange(source, target)){
      return false;
    }
    if(this.isCoolingDown()){
      return false;
    }
    if(!this.projectile.damageOnImpact.type.canDamageTarget(target)){
      return false;
    }
    this.useAmmo(container, source);
    this.durability?.use(this);
    super.use(container, this, source, target);
    this.addCooldown();
    //let damageDealt = this.processDamage(container,source, target);
    //console.log('['+source.name+'] used weapon ['+this.name+'('+this.magazine?.inventoryItems[0].item?.name+')] on target ['+target.name+'], dealing '+damageDealt+' damage.');
    return true;
  }



  public processReload<S extends Unit>(container: GameContainer, source: S){
    if((!this.magazine) || this.loadTimeLeft > 0){
      return false;
    }
    let selectedAmmo = this.magazine.inventoryItems[0].item;
    if((selectedAmmo instanceof Ammo) && selectedAmmo.amount >= this.ammoPerUse){
      return true;
    }
    let isReloaded =  this.reload(container, source);
    return !(!isReloaded || this.loadTimeLeft > 0);
  }


  public useAmmo<S extends Unit>(container: GameContainer, source: S){
    let selectedAmmo = this.magazine.inventoryItems[0].item;
    if((selectedAmmo instanceof Ammo) && selectedAmmo.amount >= this.ammoPerUse) {
      selectedAmmo.amount -= this.ammoPerUse;
      return true;
    }
    return false;
  }


  drawRangeMarkers(container: GameContainer, unit: Unit, relativePos: Vector, c: CanvasRenderingContext2D){
    c.beginPath();
    c.lineWidth = 1;
    c.arc(relativePos.x, relativePos.y, this.getCalculatedWeaponRange(), 0, 2 * Math.PI);
    if(this.canOperate(unit)){
      if(container.player.selectedEntity && container.player.selectedEntity.faction.isHostile(unit)){
        c.fillStyle = '#D0404016';
        c.strokeStyle = '#D0404064';
      } else if(container.player.selectedEntity && container.player.selectedEntity.faction.isFriend(unit)) {
        c.fillStyle = '#40D04016';
        c.strokeStyle = '#40D04064';
        c.fill();
        c.stroke();
      } else {
        c.fillStyle = '#D0D04016';
        c.strokeStyle = '#D0D04064';
        c.fill();
        c.stroke();
      }
    } else {
      c.fillStyle = '#40404016';
      c.strokeStyle = '#40404064';
    }
  }

  cooldownReload(framerate: number){
    if(this.loadTimeLeft > 0){
      this.loadTimeLeft -= 1000/framerate;
      if(this.loadTimeLeft < 0){
        this.loadTimeLeft = 0;
      }
    }
  }



  addCooldown(adjustment: number = 0){
    if(this.hps > 0 && this.hps < 1001) {
      this.hpsCooldown = (1000 / this.hps) + adjustment;
    } else {
      this.hpsCooldown = adjustment;
    }
  }

  cooldown(framerate: number){
    if(this.hpsCooldown > 0){
      this.hpsCooldown -= 1000/framerate;
      if(this.hpsCooldown < 0){
        this.hpsCooldown = 0;
      }
    }
  }

  isCoolingDown():boolean{
    return this.hpsCooldown > 0;
  }
}
