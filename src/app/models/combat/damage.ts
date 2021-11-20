import {DamageType} from "./damage-type";
import {DamageSpreadFactor} from "./damage-spread-factor";
import {Entity} from "../entities/entity";
import {GameContainer} from "../gameplay/game-container";
import {Weapon} from "../weapons/weapon";
import {Tool} from "../tools/tool";

export class Damage{
  name: string;
  damageFactor: number;
  amounts: Array<DamageSpreadFactor>;
  accuracy: number;
  accuracyWhileMoving: number;
  critChance: number;
  critMultiplier: number
  type: DamageType;
  constructor(
    name: string = '',
    damageFactor: number = 1,
    amounts: Array<DamageSpreadFactor> = [new DamageSpreadFactor(1, 10)],
    accuracy: number = 1,
    accuracyWhileMoving = 0.5,
    critChance: number = 0.1,
    critMultiplier: number = 2.5,
    type: DamageType = new DamageType()
  ) {
    this.name = name;
    this.damageFactor = damageFactor;
    this.amounts = amounts;
    this.accuracy = accuracy;
    this.accuracyWhileMoving = accuracyWhileMoving;
    this.critChance = critChance;
    this.critMultiplier = critMultiplier;
    this.type = type;
  }

  processWeaponDamage<S extends Entity, T extends Entity>(container: GameContainer, damageAmount:number, weapon:Weapon, source: S, target: T){
    let crit = 1;
    if (Math.random() < weapon.projectile.damageOnImpact.critChance){
      console.log("Critical hit!");
      crit = weapon.projectile.damageOnImpact.critMultiplier;
      if(weapon.fxAttackChannel.length > 0){
        weapon.fxAttackChannel.forEach( fx => {
          fx.criticalHit = true;
        })
      }
    }
    let damageDealt: number = weapon.getCalculatedWeaponDamage(damageAmount) as number;
    damageDealt *= target.lifeProperties.armorClass.damageFactorGlobal as number; //times the global multiplier
    damageDealt *= weapon.projectile.damageOnImpact.type.damageFactorPerArmorClass.getDamageFactor(target.lifeProperties.armorClass) as number;//times the armor class multiplier
    damageDealt *= crit as number;
    target.takeDamage(container, source, target, damageDealt as number);
    console.log("Damage: " + damageDealt);
    return damageDealt;
  }


}
