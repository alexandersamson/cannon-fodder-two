import {GenericPropertiesLean} from "../generic-properties-lean";
import {IBuffPropertyValueNumber} from "../buffs/IBuff-property-value-number";
import {GameContainer} from "../gameplay/game-container";
import {Entity} from "../entities/entity";


export class Ability extends GenericPropertiesLean{
  name = "Ability";
  title = "Ability";

  passive: boolean = true;
  propertyValueBuffs: Array<IBuffPropertyValueNumber> = [];

  constructor() {
    super();
  }

  enforceBuffs(container: GameContainer, entity: Entity){
    if(this.propertyValueBuffs.length > 0){
      this.propertyValueBuffs.forEach(buff => {
        buff.setBuffedPropertyValue(container.framerate, entity)
      })
    }
  }
}
