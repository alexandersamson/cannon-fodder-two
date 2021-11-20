import {Ability} from "../abilities/ability";
import {Faction} from "./faction";
import {FactionHumanSurvivorsAlpha} from "./faction-human-survivors-alpha";
import {FactionHumanSurvivorsBeta} from "./faction-human-survivors-beta";
import {FactionNotAssigned} from "./faction-not-assigned";
import {Color} from "../effects/color";

export class FactionHumanStateArmy extends Faction{
  friendlyTo: Array<Faction>;
  hostileTo: Array<Faction>;
  neutralTo: Array<Faction>;
  factionBuffs: Array<Ability>;
  color: Color;

  constructor() {
    super();
    this.type = 'Faction';
    this.name = 'State Army';
    this.title = 'State Army';
    this.descriptionBuy = 'The State Army is there to protect the interests of nothing but the state.';
    this.description = 'The State Army is there to protect the interests of nothing but the state.';

    this.color = new Color(128,128,128,255);
    this.friendlyTo = [];
    this.hostileTo = [FactionHumanSurvivorsAlpha.prototype, FactionHumanSurvivorsBeta.prototype];
    this.neutralTo = [FactionNotAssigned.prototype];
    this.factionBuffs = [];
  }


}
