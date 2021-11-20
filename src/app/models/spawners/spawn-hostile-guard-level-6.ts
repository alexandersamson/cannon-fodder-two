import {Spawner} from "./spawner";
import {SecurityOfficer} from "../units/men/security-officer";
import {InvSmallBackpack} from "../inventory/inv-small-backpack";
import {M4A1} from "../weapons/rifles/m4a1";
import {Vector} from "../movement/vector";
import {Unit} from "../units/unit";
import {Item} from "../items/item";
import {Bullet556Hv} from "../ammo/bullet-556hv";
import {UnitAi} from "../game-ai/unit-ai";
import {FactionHumanStateArmy} from "../factions/faction-human-state-army";
import {GameContainer} from "../gameplay/game-container";

export class SpawnHostileGuardLevel6 {
  unit: Unit;
  constructor(container: GameContainer, atLocation: Vector = {x:1000,y:1000,z:0}, moveTo: Array<Vector> = [], orderAttack: Unit | Item | undefined = undefined) {
    this.unit = new Spawner(
      container,
      new SecurityOfficer(container),
      new FactionHumanStateArmy(),
      atLocation,
      moveTo,
      orderAttack,
      new InvSmallBackpack(10),
      [new M4A1()],
      [new Bullet556Hv(300)],
      undefined,
      undefined
    ).unit;
    this.unit.level = 6;
    this.unit.usesAi.push(new UnitAi()); //Give it some brains
  }
}
