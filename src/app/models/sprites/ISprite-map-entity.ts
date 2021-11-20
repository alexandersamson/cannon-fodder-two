import {SpriteVariant} from "./sprite-variant";
import {ISpriteBase} from "./ISprite-base";

export interface ISpriteMapEntity extends ISpriteBase{
  spriteVariants: {
    idle: SpriteVariant,
    damaged: SpriteVariant,
    broken: SpriteVariant,
    open: SpriteVariant,
    steppedOn: SpriteVariant,
  }

}
