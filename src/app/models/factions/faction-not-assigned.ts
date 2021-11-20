import {Ability} from "../abilities/ability";
import {Faction} from "./faction";
import {Color} from "../effects/color";

export class FactionNotAssigned extends Faction{
  friendlyTo: Array<Faction>;
  hostileTo: Array<Faction>;
  neutralTo: Array<Faction>;
  factionBuffs: Array<Ability>;
  color: Color

  constructor() {
    super();
    this.type = 'Faction';
    this.name = 'Not Aligned';
    this.title = 'Not Aligned';
    this.descriptionBuy = 'Not aligned to a faction.';
    this.description = 'Not aligned to a faction.';

    this.color = new Color(128,128,128,255);
    this.friendlyTo = [];
    this.hostileTo = [];
    this.neutralTo = [];
    this.factionBuffs = [];
    this.degradeRelationOnBeingAttacked = false;
  }


}
