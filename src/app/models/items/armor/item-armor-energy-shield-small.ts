import {ItemArmor} from "./item-armor";
import {AbilityPassiveSmallEnergyShield20} from "../../abilities/ability-passive-small-energy-shield20";

export class ItemArmorEnergyShieldSmall extends ItemArmor{
  constructor() {
    super();
    this.name = "Small Energy Shield";
    this.shortName = "Sm. Energy Shield"
    this.type = "Armor";
    this.title = "Energy SHield";
    this.maxStackSize = 1;
    this.passiveAbilities.push(new AbilityPassiveSmallEnergyShield20());
  }
}
