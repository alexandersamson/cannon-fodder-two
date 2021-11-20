import {GenericPropertiesLean} from "../generic-properties-lean";
import {DamageFactorPerArmorClass} from "./damage-factor-per-armor-class";
import {Unit} from "../units/unit";
import {MovementZone} from "../armor-classes/movement-zone";
import {ArmorClass} from "../armor-classes/armor-class";
import {Entity} from "../entities/entity";


export class DamageType extends GenericPropertiesLean{
  allowedUnits: Array<typeof Unit>;
  allowedArmorClasses: Array<typeof ArmorClass>;
  allowedMovementZones: Array<typeof MovementZone>;
  damageFactorPerArmorClass: DamageFactorPerArmorClass;

  constructor() {
    super();

    this.allowedUnits = [
      Unit
    ];

    this.allowedArmorClasses = [
      ArmorClass
    ];

    this.allowedMovementZones = [
      MovementZone
    ];

    this.damageFactorPerArmorClass = new DamageFactorPerArmorClass();
  }


  canDamageTarget<T extends Entity>(target: T){
    if(this.allowedUnits[0] !== Unit){
      if(this.allowedUnits.find(x => {
        return x.name === target.constructor.name
      }) === undefined){
        return false;
      }
    }
    if(this.allowedArmorClasses[0] !== ArmorClass){
      if(this.allowedArmorClasses.find(x => {
        return x.name === target.lifeProperties.armorClass.constructor.name
      }) === undefined){
        return false;
      }
    }
    if(this.allowedMovementZones[0] !== MovementZone){
      if(this.allowedMovementZones.find(x => {
        return x.name === target.lifeProperties.armorClass.movementZones.constructor.name
      }) === undefined){
        return false;
      }
    }
    return true;
  }
}
