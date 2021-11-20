import {Inventory} from "./inventory";
import {Weapon} from "../weapons/weapon";
import {Item} from "../items/item";
import {InventorySlot} from "./inventory-slot";

export class InvWeaponMagazine extends Inventory{
  constructor(magSize: number = 30, weapon: Weapon | null = null, slots: number = 1) {
    super(slots);

    //General properties
    this.name = "Generic Weapon Magazine";
    this.description = "This magazine holds the ammo for your weapon";

    //Since it's a magazine, we should only accept bullet types
    this.allowAllItems = false;
    this.allowedItems = [];

    //A magazine has a limited capacity of ammo,, even though ammo can have a higher maxStackSize
    this.maxItemStackSize = magSize; //amount of ammo that fits in this magazine (30 is default)
    this.maxStackSize = 10; // max stack size of these magazines in a bag 10 is default
    this.maxTotalWeight = 10; // Kilos. This should at least accommodate the weight of the ammo that's going to be used (10 is default)
    this.maxItemWeight = 1; // Kilos. Should be higher than the weight of a single piece of ammo that's going to be used (1 is default)

    //If there's a valid weapon supplied, we can automatically set the usable ammo for this magazine
    if(weapon){
      this.setAllowedAmmoForWeapon(weapon);
    }
  }

  assignToWeapon(weapon: Weapon, magSize: number){
    this.setAllowedAmmoForWeapon(weapon);
    this.maxItemStackSize = magSize;
  }


  //At instantiation, this magazine cannot hold any ammo (see emtpy allowedItems array). Use this method to initially set allowed ammo types.
  setAllowedAmmoForWeapon(weapon: Weapon){
    if (weapon.usableAmmo.length < 1){
      //console.log('this weapon ['+weapon.name+'] does not use ammo.')
      return;
    }
    this.allowedItems = [...weapon.usableAmmo];
  }

  insertItemStack(itemObject: Item | InventorySlot): InventorySlot {
    return super.insertItemStack(itemObject);
  }

}
