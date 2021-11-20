import {ISpriteItem} from "../../ISprite-item";
import {Vector} from "../../../movement/vector";
import {SpriteVariant} from "../../sprite-variant";

import {SpriteItem} from "../sprite-item";
import {GameContainer} from "../../../gameplay/game-container";

export class SpriteLootChest extends SpriteItem
{

  name: string = "Sprite for loot chests ingame";
  originOffset: Vector = new Vector();
  rotation: number = 0;
  toolHoldingOffset: Vector = new Vector();

  constructor(container: GameContainer) {
    super(container, 'treasurechests-32x32');
    this.spriteVariants.idle.frames[0].size.x = 32;
    this.spriteVariants.idle.frames[0].size.y = 32;
    this.spriteVariants.idle.frames[0].pos.x = 0;
    this.spriteVariants.idle.frames[0].pos.y = 253;
    this.spriteVariants.idle.frames[0].scale = 0.65;

    this.spriteVariants.open.frames[0].size.x = 32;
    this.spriteVariants.open.frames[0].size.y = 32;
    this.spriteVariants.open.frames[0].pos.x = 0;
    this.spriteVariants.open.frames[0].pos.y = 221;
    this.spriteVariants.open.frames[0].scale = 0.65;
  }



}
