import { Component, OnInit, Input } from '@angular/core';
import {CommodityService} from "../../services/commodity.service";
import {Commodity} from "../../models/commodities/commodity";
import {Entity} from "../../models/entities/entity";
import {Ammo} from "../../models/ammo/ammo";
import {InvWeaponMagazine} from "../../models/inventory/inv-weapon-magazine";
import {Weapon} from "../../models/weapons/weapon";
import {GameContainer} from "../../models/gameplay/game-container";
import {Unit} from "../../models/units/unit";
import {Inventory} from "../../models/inventory/inventory";

@Component({
  selector: 'app-commodity-bar',
  templateUrl: './commodity-bar.component.html',
  styleUrls: ['./commodity-bar.component.css']
})
export class CommodityBarComponent implements OnInit {

  objectKeys = Object.keys;
  public currentCommodity: Commodity;

  @Input() gameContainer: GameContainer = new GameContainer();
  @Input() selectedEntity: Entity | undefined = undefined;
  @Input() selectedAmmo: Ammo | undefined = undefined;
  @Input() selectedMag: InvWeaponMagazine | undefined = undefined;
  @Input() selectedWeapon: Weapon | undefined = undefined;

  public inventoryOpen = false;
  public inventoryIndexSelected = 0;
  public inventoryWeaponSelected = 0;

  constructor(private commodityService: CommodityService) {
    this.currentCommodity = new Commodity();
    this.commodityService.currentCommodity.subscribe(value => {
      this.currentCommodity = value
    }, error => {
      //console.log('error');
    })
  }

  getEntityInventories(entity:Entity):Inventory[]{
    let unit = this.selectedEntity as Unit
    if(unit.inventories) {
        return unit.inventories;
    }
    return [];
  }


  getPlayerInventory(index:number):Inventory{
    let unit = this.selectedEntity as Unit
    if(unit.inventories && unit.inventories[index]) {
      if (unit.inventories[index]) {
        return unit.inventories[index];
      }
    }
    return new Inventory(10)
  }

  openInventory(entity: Entity){
    if(this.inventoryOpen){
      this.closeInventory(true);
      this.inventoryOpen = !this.inventoryOpen
      return
    }
    this.gameContainer.sounds.add('inventory/inventory-bag-open');
    this.inventoryOpen = !this.inventoryOpen
    let button = document.querySelector('#open-inventory-button') as HTMLElement;
    button.style.backgroundColor = "#00060080"
  }

  closeInventory(playCloseSound: boolean = true){
    if(playCloseSound) this.gameContainer.sounds.add('inventory/inventory-bag-close');
    this.inventoryWeaponSelected = 0;
    this.inventoryIndexSelected = 0;
    let button = document.querySelector('#open-inventory-button') as HTMLElement;
    button.style.backgroundColor = "#00600000"
  }

  openInventoryBag(index: number){
    let unit: Unit = this.selectedEntity as Unit;
    if(unit.inventories[index]){
      let oldButton: HTMLElement = document.querySelector(`#button-select-inventory-bag-${this.inventoryIndexSelected}`) as HTMLElement
      oldButton.style.backgroundColor = "#00600000";
      this.inventoryIndexSelected = index;
      let newButton: HTMLElement = document.querySelector(`#button-select-inventory-bag-${index}`) as HTMLElement
      newButton.style.backgroundColor = "#006000FF";
    }
  }

  getDurability(): string {
    let dura: string = '0'
    if(this.selectedWeapon && this.selectedWeapon.durability){
      dura = Math.ceil((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax) * 100).toString();
    }
    return dura;
  }

  getDurabilitySuffix(): string {
    let dura: string = 'unknown'
    if(this.selectedWeapon && this.selectedWeapon.durability){
      if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.95){
        dura = "pristine";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.85){
        dura = "as new";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.75){
        dura = "great";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.65){
        dura = "good";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.5){
        dura = "okay";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.3){
        dura = "used";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0.1){
        dura = "worn";
      } else if((this.selectedWeapon.durability.amountCurrent / this.selectedWeapon.durability.amountMax)> 0){
        dura = "bad";
      } else {
        dura = "broken";
      }
    }
    return dura;
  }

  getWeaponTooltip(weapon: Weapon){
    return`
    ${weapon.name} | ${weapon.title} | ${weapon.type}
    Damage: ${weapon.getCalculatedWeaponDamage().toString()}
    HPS: ${weapon.hps.toString()}
    DPS: ${this.getWeaponDps(weapon)[0].toString()}/${this.getWeaponDps(weapon)[1].toString()} (move/stand)
    Range: ${weapon.getCalculatedWeaponRange().toString()}
    Acc.%: ${(weapon.getCalculatedWeaponAccuracy()*100).toFixed(1).toString()}
    Crit.%: ${(weapon.projectile.damageOnImpact.critChance*100).toFixed(1).toString()}
    Crit.x: ${weapon.projectile.damageOnImpact.critMultiplier.toString()}x
    Quality: ${this.getDurability()}% (${this.getDurabilitySuffix()})
    Ammo: ${this.selectedAmmo?.name.toString()}`;
  }

  getWeaponDps(weapon: Weapon):Array<number>{
    let dps: number[] = [0,0];
    //The order of the following calculations is important.
    //Get the min-damage
    dps[0] += weapon.getCalculatedWeaponDamage(); //1. Get the base damage
    dps[0] *= weapon.projectile.damageOnImpact.accuracyWhileMoving //2. multiply it by the accuracy
    dps[0] += (dps[0] * weapon.projectile.damageOnImpact.critMultiplier * weapon.projectile.damageOnImpact.critChance); //3. Add the crit multiplier multiplied by it's chance to it
    dps[0] *= weapon.hps //4. multiply it by the hits per second (hps)
    dps[0] = Math.round(dps[0]*10)/10; //To get 1 decimal precision. In conjunction with .toString it's not practical to use .toFixed here.
    //Get the max damage
    dps[1] += weapon.getCalculatedWeaponDamage(); //1. Get the base damage
    dps[1] *= weapon.projectile.damageOnImpact.accuracy //2. multiply it by the accuracy
    dps[1] += (dps[1] * weapon.projectile.damageOnImpact.critMultiplier * weapon.projectile.damageOnImpact.critChance); //3. Add the crit multiplier multiplied by it's chance to it
    dps[1] *= weapon.hps //4. multiply it by the hits per second (hps)
    dps[1] = Math.round(dps[1]*10)/10; //To get 1 decimal precision. In conjunction with .toString it's not practical to use .toFixed here.
    return dps;
  }

  actionReload(weapon: Weapon){
    weapon.reload(this.gameContainer, this.selectedEntity as Unit);
  }

  ngOnInit(): void {
    this.currentCommodity.money.amount += 5;
    this.commodityService.updateCommodity(this.currentCommodity)
  }


  onDragstart(event: DragEvent){
    let target = event.target as HTMLElement;
    event.dataTransfer?.setData("source-item", target.id)
  }

  onDragover(event: DragEvent){
    event.preventDefault();
  }

  onDrop(event: DragEvent){
    let target = event.target as HTMLElement;
    let targetId = target.id;
    let sourceId = event.dataTransfer?.getData("source-item");
    if(sourceId && targetId){
      this.parseInventoryItemSwap(sourceId, targetId);
    }
  }

  onBagSelectorDragover(event: DragEvent){
    event.preventDefault();
    if(event.target){
      let target = event.target as HTMLElement
      this.openInventoryBag(parseInt(target.getAttribute('name') as string));
    }
  }

  onClickOwnInventoryItem(event: MouseEvent) {
    let inventory = this.getPlayerInventory(this.inventoryIndexSelected)
    let target = event.target as HTMLElement
    let itemSlotIndex = parseInt(target.getAttribute('name') as string);
    this.gameContainer.userInputHandler.clickParser.clickedOnOwnInventorySlot(this.gameContainer, this.gameContainer.player.selectedEntity, inventory, itemSlotIndex);
  }

  parseInventoryItemSwap(sourceString: string, targetString: string){
    //console.log(sourceString, targetString);
    let splittedSource = sourceString.split(';');
    let splittedTarget = targetString.split(';');
    if(splittedSource.length !== 4 && splittedTarget.length !== 4){
      console.log("commodity-bar.ts>parseInventoryItemSwap# invalid source- and/or target strings");
      return; //some invalid values are provided, so skip this dance
    }
    if(splittedSource[0].toLowerCase() == 'inventory' && splittedTarget[0].toLowerCase() == 'inventory'){
      //We are dealing with an inventory-to-inventory swap
      let sourceInventory: Inventory | undefined;
      let targetInventory: Inventory | undefined;
      if(splittedSource[1] === 'unit-inventory-player'){ //if it's the player inventory
        sourceInventory = this.getPlayerInventory(parseInt(splittedSource[2]))
      }
      if(splittedTarget[1] === 'unit-inventory-player'){ //if it's the player inventory
        targetInventory = this.getPlayerInventory(parseInt(splittedTarget[2]))
      }
      if(sourceInventory && targetInventory && splittedSource[3] && splittedTarget[3]) {
        sourceInventory.swapItems(
          this.gameContainer,
          sourceInventory,
          parseInt(splittedSource[3]),
          targetInventory,
          parseInt(splittedTarget[3]));
      }
    }
  }

}
