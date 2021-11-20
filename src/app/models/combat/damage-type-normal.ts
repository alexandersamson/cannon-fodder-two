import {DamageType} from "./damage-type";

export class DamageTypeNormal extends DamageType{
  constructor() {
    super();
    this.damageFactorPerArmorClass.setVsAllTo(1);
  }
}
