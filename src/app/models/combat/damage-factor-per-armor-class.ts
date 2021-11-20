import {ArmorClass} from "../armor-classes/armor-class";

export class DamageFactorPerArmorClass {
  HumanBiologicUnarmored: number = 1;
  HumanBiologicArmored: number = 0.75;
  HumanBiologicHeroic: number = 0.5;
  HumanMagicUnarmored: number = 1;
  HumanMagicArmored: number = 0.75;
  HumanMagicHeroic: number = 0.5;
  HumanVehicleUnarmored: number = 1;
  HumanVehicleArmored: number = 0.75;
  HumanVehicleHeroic: number = 0.5;
  HumanFlyerUnarmored: number = 1;
  HumanFlyerArmored: number = 0.75;
  HumanFlyerHeroic: number = 0.5;
  HumanShipUnarmored: number = 1;
  HumanShipArmored: number = 0.75;
  HumanShipHeroic: number = 0.5;
  HumanBuildingUnarmored: number = 1;
  HumanBuildingArmored: number = 0.75;
  HumanBuildingHeroic: number = 0.5;
  AnimalGroundUnarmored: number = 1;
  AnimalGroundArmored: number = 0.75;
  AnimalGroundHeroic: number = 0.5;
  AnimalFlyerUnarmored: number = 1;
  AnimalFlyerArmored: number = 0.75;
  AnimalFlyerHeroic: number = 0.5;
  AnimalAquaticUnarmored: number = 1;
  AnimalAquaticArmored: number = 0.75;
  AnimalAquaticHeroic: number = 0.5;
  AlienBiologicUnamored: number = 1;
  AlienBiologicArmored: number = 0.75;
  AlienBiologicHeroic: number = 0.5;
  AlienVehicleUnamored: number = 1;
  AlienVehicleArmored: number = 0.75;
  AlienVehicleHeroic: number = 0.5;
  AlienFlyerUnamored: number = 1;
  AlienFlyerArmored: number = 0.75;
  AlienFlyerHeroic: number = 0.5;
  AlienAquaticUnamored: number = 1;
  AlienAquaticArmored: number = 0.75;
  AlienAquaticHeroic: number = 0.5;
  AlienBuildingUnamored: number = 1;
  AlienBuildingArmored: number = 0.75;
  AlienBuildingHeroic: number = 0.5;
  DivineUnarmored: number = 0.2;
  DivineArmored: number = 0.15;
  DivineHeroic: number = 0.1;
  itemUnarmored: number = 1;
  itemArmored: number = 0.75
  itemHeroic: number = 0.5

  constructor() {
  }

  getDamageFactor(armorClass: ArmorClass): number{
    if(!armorClass){
      return 1;
    }
    let key = armorClass.constructor.name as keyof DamageFactorPerArmorClass
    return this[key] as number;
  }

  setVsAllTo(value: number){
    Object.keys(this).forEach((key) => {
      let val = key as keyof DamageFactorPerArmorClass;
      if(typeof this[val] === "number") {
        this[val] = value as any;
      }
      });
  }

}
