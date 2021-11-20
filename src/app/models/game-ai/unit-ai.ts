import {IAi} from "./IAi";
import {Unit} from "../units/unit";
import {Entity} from "../entities/entity";
import {GameContainer} from "../gameplay/game-container";

export class UnitAi implements IAi{
  guardRange: number = 75;
  movesToEngage: boolean = true;
  maxMoveRangeFromSpawn: number = 500;
  retreatAtLowHealth: boolean = false;
  retreatAtNoAmmo: boolean = true;
  cooldownCurrent: number = 0;
  cooldownSet:     number = 150; //run this every 200 msecs

  constructor() {

  }

  runAi(container: GameContainer, unit: Unit): void {
    //Checking cooldown
    if(this.cooldownCurrent > 0){
      this.cooldownCurrent -= 1000/container.framerate;
      if(this.cooldownCurrent < 0){
        this.cooldownCurrent = 0;
      }
    }
    this.cooldownCurrent = this.cooldownSet;

    //running the ai
    //Set the effective guard range to the weapon range, with a minimum of the current set guard range
    if(unit.weapons.length > 0){
      this.guardRange = Math.max(this.guardRange, unit.weapons[0].projectile.maxEffectiveRange);
    }

    if(this.guardRange > 0 && !unit.target) {
      let closestEnemy: Entity | undefined;
      let closestRange: number = this.guardRange;
      container.units.forEach(target => {
        if (target === unit) {
          return;
        }
        if (!unit.faction.isHostile(target)) {
          return;
        }
        let range = Math.hypot(unit.movement.curPos.x - target.movement.curPos.x, unit.movement.curPos.y - target.movement.curPos.y);
        if (range <= this.guardRange) {
          if (closestRange > range) {
            closestEnemy = target as Unit;
            closestRange = range;
          }
        }
      })
      if (closestEnemy) {
        unit.target = closestEnemy;
      }
    }
    if(unit.target){
        let target = unit.target as Unit;
        if(!target.lifeProperties.isAlive){
          unit.target = undefined;
          unit.moveTo(unit.spawnPoint)
          return;
        }
        unit.attack(container, target);
        if(this.movesToEngage && target.movement.curPos){
          if(unit.weapons[0]) {
            unit.movement.getInRangeOf(target, unit.weapons[0].projectile.maxEffectiveRange);
          } else {
            unit.movement.getInRangeOf(target, unit.interactionRange);
          }
        } else {
          if (unit.movement.moveWaypoints.length < 2){
            unit.stop();
          }
        }
      }
    }

    onTakingDamage(container:GameContainer, unit: Unit, damageSource: Entity){
      if(
        !unit.target &&
        damageSource &&
        container.player.selectedEntity &&
        damageSource === container.player.selectedEntity &&
        container.player.selectedEntity.lifeProperties.isAlive &&
        damageSource as Entity !== Unit as unknown as Entity
      ) {
        unit.target = damageSource;
      }
    }
}
