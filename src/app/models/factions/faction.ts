import {GenericProperties} from "../generic-properties";
import {Ability} from "../abilities/ability";
import {Entity} from "../entities/entity";
import {Color} from "../effects/color";

export class Faction extends GenericProperties{
  friendlyTo: Array<Faction>;
  hostileTo: Array<Faction>;
  neutralTo: Array<Faction>;
  factionBuffs: Array<Ability>;
  allowTargetFriends: boolean;
  allowTargetNeutrals: boolean;
  degradeRelationOnBeingAttacked: boolean;
  color: Color;

  constructor() {
    super();
    this.type = 'Faction';
    this.name = 'Faction';
    this.title = 'Inventory';
    this.descriptionBuy = 'The faction a unit or item belongs to';
    this.description = 'The faction a unit or item belongs to';

    this.color = new Color(128,128,128,255);
    this.friendlyTo = [];
    this.hostileTo = [];
    this.neutralTo = [];
    this.factionBuffs =[];
    this.allowTargetFriends = false;
    this.allowTargetNeutrals = true;
    this.degradeRelationOnBeingAttacked = true;
  }

  isFriend<T extends Entity>(target: T){
    return this.friendlyTo.some(relation => {
      return target.faction.constructor.name === relation.constructor.name;
    })
  }

  isNeutral<T extends Entity>(target: T){
    return this.neutralTo.some(relation => {
      return target.faction.constructor.name === relation.constructor.name;
    })
  }

  isHostile<T extends Entity>(target: T){
    return this.hostileTo.some(relation => {
      return target.faction.constructor.name === relation.constructor.name;
    })
  }


  targetEntity<S extends Entity, T extends Entity>(source: Entity, target: Entity):boolean{
      this.processFactionRelatioshipStatus(target, source);
      return true;
  }


  isAllowedToTargetFactionMember<S extends Entity, T extends Entity>(source: Entity, target: Entity):boolean{
    if(source.faction.allowTargetFriends && source.faction.allowTargetNeutrals){
      return true;
    }
    if(!source.faction.allowTargetFriends){
      for (const ally of source.faction.friendlyTo) {
        if(ally.constructor.name === target.faction.constructor.name){
          //console.log('Cannot target friendly factions.');
          return false;
        }
      }
    }
    if(!source.faction.allowTargetNeutrals){
      for (const neutral of source.faction.neutralTo) {
        if(neutral.constructor.name === target.faction.constructor.name){
          //console.log('Cannot target neutral factions.');
          return false;
        }
      }
    }
    return true;
  }




  processFactionRelatioshipStatus<S extends Entity, T extends Entity>(source: Entity, target: Entity){
    if(!target.faction.degradeRelationOnBeingAttacked){
      return;
    }
    this.degradeRelationship(target, source.faction);
  }


  degradeRelationship<T extends Entity>(targetEntity: T, sourceFaction: Faction){
    let degradeFrom: any[] = [];
    let degradeTo = [];
    let degradeIndex = null;
    for (const [index, neutralRelation] of targetEntity.faction.neutralTo.entries()){
      if (neutralRelation.constructor.name === sourceFaction.constructor.name){
        degradeFrom = targetEntity.faction.neutralTo;
        degradeTo = targetEntity.faction.hostileTo;
        degradeIndex = index;
        //console.log("An entity with faction ["+sourceFaction.name+"] degraded relationship with faction ["+targetEntity.faction.name+"] from Neutral to Hostile.");
        break;
      }
    }
    if(!degradeIndex) {
      for (const [index, friendlyRelation] of targetEntity.faction.friendlyTo.entries()) {
        if (friendlyRelation.constructor.name === sourceFaction.constructor.name) {
          degradeFrom = targetEntity.faction.friendlyTo;
          degradeTo = targetEntity.faction.neutralTo;
          degradeIndex = index;
          //console.log("An entity with faction ["+targetEntity.faction.name+"] degraded relationship with faction ["+sourceFaction.name+"] from Friendly to Neutral.");
          break;
        }
      }
    }
    if(degradeIndex){
      degradeTo.push(degradeFrom[degradeIndex]);
      degradeFrom.splice(degradeIndex, 1);
    }
  }

}
