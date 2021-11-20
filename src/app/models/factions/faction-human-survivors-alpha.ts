import {Ability} from "../abilities/ability";
import {Faction} from "./faction";
import {FactionHumanSurvivorsBeta} from "./faction-human-survivors-beta";
import {FactionHumanStateArmy} from "./faction-human-state-army";
import {FactionNotAssigned} from "./faction-not-assigned";
import {Color} from "../effects/color";

export class FactionHumanSurvivorsAlpha extends Faction{
  friendlyTo: Array<Faction>;
  hostileTo: Array<Faction>;
  neutralTo: Array<Faction>;
  factionBuffs: Array<Ability>;
  color: Color;

  constructor() {
    super();
    this.type = 'Faction';
    this.name = 'Survivors Alpha';
    this.title = 'Survivors Alpha';
    this.descriptionBuy = 'The Survivors Aplha are one of the survivors factions on Earth.';
    this.description = 'The Survivors Aplha are one of the survivors factions on Earth.';

    this.color = new Color(128,128,128,255);
    this.friendlyTo = [];
    this.hostileTo = [FactionHumanStateArmy.prototype];
    this.neutralTo = [FactionNotAssigned.prototype, FactionHumanSurvivorsBeta.prototype];
    this.factionBuffs = [];
    this.allowTargetNeutrals = true;
    this.degradeRelationOnBeingAttacked = true;
  }


}
