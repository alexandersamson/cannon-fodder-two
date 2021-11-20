import {Unit} from "../units/unit";
import {GameContainer} from "../gameplay/game-container";
import {Entity} from "../entities/entity";

export interface IAi {

  runAi(container: GameContainer, unit: Unit):void;
  onTakingDamage(container: GameContainer, unit: Unit, damageSource: Entity):void;

}
