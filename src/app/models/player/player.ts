import {GenericProperties} from "../generic-properties";
import {Entity} from "../entities/entity";
import {Commodity} from "../commodities/commodity";
import {Unit} from "../units/unit";
import {Ammo} from "../ammo/ammo";
import {InvWeaponMagazine} from "../inventory/inv-weapon-magazine";
import {Faction} from "../factions/faction";
import {FactionHumanSurvivorsAlpha} from "../factions/faction-human-survivors-alpha";
import {Weapon} from "../weapons/weapon";

export class Player extends GenericProperties{
  selectedEntity: Entity | undefined = undefined;
  selectedAmmo: Ammo | undefined = undefined;
  selectedMag: InvWeaponMagazine | undefined = undefined;
  selectedWeapon: Weapon | undefined = undefined;
  activeEntities: Array<Entity> = [];
  commodities: Commodity = new Commodity();
  faction: Faction = new Faction();

  constructor() {
    super();
    this.name = "Current Player";
    this.description = "The player playing this game";
    this.title = '';
    this.descriptionBuy = '';
    this.faction = new FactionHumanSurvivorsAlpha(); //The player plays with this faction
  }

  selectEntity(entity: Entity){
      this.selectedEntity = entity;
      if(entity instanceof Unit) {
        if(entity.weapons.length > 0) {
          this.selectedMag = entity.weapons[0].magazine as InvWeaponMagazine;
          this.selectedAmmo = entity.weapons[0].magazine?.inventoryItems[0].item as Ammo;
          this.selectedWeapon = entity.weapons[0] as Weapon;
        }
      }
  }
}


