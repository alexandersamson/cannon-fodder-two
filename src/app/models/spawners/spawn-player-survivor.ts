import {Spawner} from "./spawner";
import {InvSmallBackpack} from "../inventory/inv-small-backpack";
import {Vector} from "../movement/vector";
import {Unit} from "../units/unit";
import {Item} from "../items/item";
import {Survivor} from "../units/men/survivor";
import {FactionHumanSurvivorsAlpha} from "../factions/faction-human-survivors-alpha";
import {GameContainer} from "../gameplay/game-container";
import {PlayerAi} from "../game-ai/player-ai";
import {InvPouch} from "../inventory/inv-pouch";

export class SpawnPlayerSurvivor {
  unit: Unit;
  constructor(container: GameContainer, atLocation: Vector = {x:1200,y:1200,z:0}, moveTo: Array<Vector> = [], orderAttack: Unit | Item | undefined = undefined) {
    this.unit = new Spawner(
      container,
      new Survivor(container),
      new FactionHumanSurvivorsAlpha(),
      atLocation,
      moveTo,
      orderAttack,
      new InvSmallBackpack(16),
      [],
      [],
      undefined,
      undefined
    ).unit;
    this.unit.level = 1;
    this.unit.initHp(100, 0);
    this.unit.usesAi.push(new PlayerAi())
    this.unit.xpMax = 10;
    this.unit.inventories.push(new InvPouch());
    //Upgrade the bag (not the pouch)
    this.unit.inventories[0].maxItemWeight = 5;
    this.unit.inventories[0].maxTotalWeight = 25;
  }
}
