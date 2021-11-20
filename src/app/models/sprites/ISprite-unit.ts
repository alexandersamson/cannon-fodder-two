import {SpriteVariant} from "./sprite-variant";
import {ISpriteBase} from "./ISprite-base";

export interface ISpriteUnit extends ISpriteBase {
  spriteVariants: {
    idle: SpriteVariant,
    damaged: SpriteVariant,
    broken: SpriteVariant,
    walking: SpriteVariant,
    rotating: SpriteVariant,
    running: SpriteVariant,
    moving: SpriteVariant,
    flying: SpriteVariant,
    swimming: SpriteVariant,
    attacking: SpriteVariant,
    constructing: SpriteVariant
    mining: SpriteVariant
  }
}
