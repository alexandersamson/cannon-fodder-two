import {Ability} from "./ability";
import {BuffUnitEnergyArmorAdd20} from "../buffs/buff-unit-energy-armor-add-20";
import {Entity} from "../entities/entity";
import {GameContainer} from "../gameplay/game-container";
import {BuffUnitEnergyArmorRegenerateAdd1} from "../buffs/buff-unit-energy-armor-regenerate-add-1";

export class AbilityPassiveSmallEnergyShield20 extends Ability{
  name = "Ability";
  title = "Ability";

  constructor() {
    super();
    this.propertyValueBuffs.push(new BuffUnitEnergyArmorAdd20(), new BuffUnitEnergyArmorRegenerateAdd1())
  }

  enforceBuffs(container: GameContainer, entity: Entity) {
    super.enforceBuffs(container, entity);
  }


}
