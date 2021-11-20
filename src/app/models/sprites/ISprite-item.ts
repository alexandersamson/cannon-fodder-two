import {SpriteVariant} from "./sprite-variant";
import {ISpriteBase} from "./ISprite-base";

export interface ISpriteItem extends ISpriteBase{
  spriteVariants: {
    idle: SpriteVariant,
    open: SpriteVariant,
    locked: SpriteVariant,
    unlocked: SpriteVariant,
    inUse: SpriteVariant,
    used: SpriteVariant,
    damaged: SpriteVariant,
    broken: SpriteVariant,
  }
}
