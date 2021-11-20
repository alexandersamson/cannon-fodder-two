import {SpriteUnitMen} from "./sprite-unit-men";
import {GameContainer} from "../../../gameplay/game-container";

export class SpriteUnitMenSurvivor extends SpriteUnitMen{

  constructor(container: GameContainer) {
    super(container)
    this.spriteVariants.idle.frames[0].pos = {x:262,y:44,z:0}
    this.spriteVariants.idle.frames[0].size = {x:44,y:44,z:0}
    this.spriteVariants.idle.frames[0].scale = 0.5;
    this.spriteVariants.running.frames[0].pos = {x:262,y:44,z:0}
    this.spriteVariants.running.frames[0].size = {x:44,y:44,z:0}
    this.spriteVariants.running.frames[0].scale = 0.5;
    this.spriteVariants.attacking.frames[0].pos = {x:0,y:0,z:0}
    this.spriteVariants.attacking.frames[0].size = {x:50,y:44,z:0}
    this.spriteVariants.attacking.frames[0].scale = 0.5;
  }


}
