import {SpriteMapEntitySimpleWall} from "./sprite-map-entity-simple-wall";
import {GameContainer} from "../../../gameplay/game-container";

export class SpriteMapEntitySimpleWallHorizontal extends SpriteMapEntitySimpleWall
{

  constructor(container: GameContainer) {
    super(container);
    this.spriteVariants.idle.frames[0].pos.x = 53;
    this.spriteVariants.idle.frames[0].pos.y = 1;
    this.spriteVariants.idle.frames[0].size.x = this.tileSize;
    this.spriteVariants.idle.frames[0].size.y = this.tileSize;
    this.spriteVariants.idle.frames[0].scale = 1;
  }


}
