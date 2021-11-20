import {IAi} from "./IAi";
import {Unit} from "../units/unit";
import {Entity} from "../entities/entity";
import {GameContainer} from "../gameplay/game-container";

export class PlayerAi implements IAi{
  guardRange:      number = 75;
  cooldownCurrent: number = 0;
  cooldownSet:     number = 100; //run this every 100 msecs
  autoEngage:      boolean = false;

  constructor() {

  }

  runAi(container: GameContainer, unit: Unit): void {
    if(!this.autoEngage){
      return;
    }
    //Checking cooldown
    if (this.cooldownCurrent > 0) {
      this.cooldownCurrent -= 1000 / container.framerate;
      if (this.cooldownCurrent < 0) {
        this.cooldownCurrent = 0;
      } else {
        return;
      }
    }
    this.cooldownCurrent = this.cooldownSet;
    //running the ai
    if (unit.weapons.length > 0) {
      this.guardRange = Math.max(unit.weapons[0].getCalculatedWeaponRange(), this.guardRange);
    }
    if(this.guardRange > 0){
      if(unit.target){
        this.cooldownCurrent = this.cooldownSet*2; // When there's already a unit to attack, slow down the aquisition for new units
      }
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
        }})
        if (closestEnemy) {
          unit.target = closestEnemy;
        }
      }
      if(unit.target){
          unit.attack(container, unit.target as Unit)
      }
    }

  onTakingDamage(container:GameContainer, unit: Unit, damageSource: Entity){
    //for now do nothing
  }
}
