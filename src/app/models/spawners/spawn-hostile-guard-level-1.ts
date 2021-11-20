import {Spawner} from "./spawner";
import {SecurityOfficer} from "../units/men/security-officer";
import {InvSmallBackpack} from "../inventory/inv-small-backpack";
import {Pistol9mm} from "../weapons/pistols/pistol9mm";
import {Bullet9mm} from "../ammo/bullet-9mm";
import {Vector} from "../movement/vector";
import {Unit} from "../units/unit";
import {Item} from "../items/item";
import {UnitAi} from "../game-ai/unit-ai";
import {FactionHumanStateArmy} from "../factions/faction-human-state-army";
import {GameContainer} from "../gameplay/game-container";
import {InventorySlot} from "../inventory/inventory-slot";

export class SpawnHostileGuardLevel1 {
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
      [new Pistol9mm()],
      [new Bullet9mm(150)],
      undefined,
      new InventorySlot(new Bullet9mm(12+Math.round(Math.random()*6)))
    ).unit;
    this.unit.level = 1;
    this.unit.usesAi.push(new UnitAi()); //Give it some brains
    this.unit.faction = new FactionHumanStateArmy();
    this.unit.xpValueOnKill = 1;
  }
}
