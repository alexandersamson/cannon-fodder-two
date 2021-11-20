import {Ability} from "../abilities/ability";
import {Faction} from "./faction";
import {FactionHumanSurvivorsAlpha} from "./faction-human-survivors-alpha";
import {FactionHumanStateArmy} from "./faction-human-state-army";
import {FactionNotAssigned} from "./faction-not-assigned";
import {Color} from "../effects/color";

export class FactionHumanSurvivorsBeta extends Faction{
  friendlyTo: Array<Faction>;
  hostileTo: Array<Faction>;
  neutralTo: Array<Faction>;
  factionBuffs: Array<Ability>;
  color: Color;

  constructor() {
    super();
    this.type = 'Faction';
    this.name = 'Survivors Beta';
    this.title = 'Survivors Beta';
    this.descriptionBuy = 'The Survivors Beta are one of the survivors factions on Earth.';
    this.description = 'The Survivors Beta are one of the survivors factions on Earth.';

    this.color = new Color(128,128,128,255);
    this.friendlyTo = [];
    this.hostileTo = [FactionHumanStateArmy.prototype];
    this.neutralTo = [FactionNotAssigned.prototype, FactionHumanSurvivorsAlpha.prototype];
    this.factionBuffs = [];
    this.allowTargetNeutrals = true;
    this.degradeRelationOnBeingAttacked = true;
  }


}
