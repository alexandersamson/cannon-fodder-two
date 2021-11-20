import {IAi} from "./IAi";
import {GameContainer} from "../gameplay/game-container";
import {Unit} from "../units/unit";
import {Entity} from "../entities/entity";

export class GameAi implements IAi
{
  constructor() {
  }

  runAi(): void {
  }

  onTakingDamage(container: GameContainer, unit: Unit, damageSource: Entity) {
  }
}
