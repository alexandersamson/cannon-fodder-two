import {Item} from "../items/item";
import {Durability} from "../entities/durability";
import {Entity} from "../entities/entity";
import {GameContainer} from "../gameplay/game-container";
import {Random} from "../static-service-class/random";
import {Weapon} from "../weapons/weapon";

export class Tool extends Item{
  type: string;
  loadTimeSet: number;
  loadTimeLeft: number;
  hps: number = 1;
  hpsCooldown: number = 0;

  constructor() {
    super();
    this.type = 'tool';
    this.loadTimeSet = 1500; // time to (re)load this tool, in millis
    this.loadTimeLeft = 0; // time to (re)load this tool, in millis. Time that's left
    this.durability = new Durability(); //Tools usually have durability.
      this.durability.repairCostFactor = 0.25
      this.durability.repairable = true;
      this.durability.setOwnInitDurabilityAmount(500);
      this.durability.amountLossPerUse = 1;
  }

  use(container: GameContainer, tool: Tool | undefined = this, source: Entity, target: Entity | undefined = undefined){
    container.sounds.add(Random.getRandomArrayValue(this.sounds.playOnUse));
    if(tool instanceof Weapon){
      let projectile = new tool.projectile.prototype;
      projectile.launch(container, this, source, target as Entity);
    }
  }

  load(container: GameContainer, tool: Tool | undefined = this){
    this.addCooldownLoad(tool);
    container.sounds.add(Random.getRandomArrayValue(this.sounds.playOnLoad));
  }

  addCooldownLoad(tool:Tool, adjustment: number = 0){
    this.loadTimeLeft = this.loadTimeSet + adjustment;
  }
}
