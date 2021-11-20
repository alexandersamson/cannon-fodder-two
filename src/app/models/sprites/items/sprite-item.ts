import {ISpriteItem} from "../ISprite-item";
import {Vector} from "../../movement/vector";
import {SpriteVariant} from "../sprite-variant";
import {GameContainer} from "../../gameplay/game-container";
import {Sprite} from "../sprite";

export class SpriteItem extends Sprite implements ISpriteItem
{
  //From Interface ISPrite
  name: string = "map entity sprite";
  originOffset: Vector = new Vector();
  rotation: number = 0;
  toolHoldingOffset: Vector = new Vector();


  //From Interface IBasicPositions
  spriteVariants: {
    idle: SpriteVariant,
    open: SpriteVariant,
    locked: SpriteVariant,
    unlocked: SpriteVariant,
    inUse: SpriteVariant,
    used: SpriteVariant,
    damaged: SpriteVariant,
    broken: SpriteVariant,
  } = {
    idle: new SpriteVariant(),
    open: new SpriteVariant(),
    locked: new SpriteVariant(),
    unlocked: new SpriteVariant(),
    inUse: new SpriteVariant(),
    used: new SpriteVariant(),
    damaged: new SpriteVariant(),
    broken: new SpriteVariant(),
  }

  constructor(container: GameContainer, spritesheet: string = 'treasurechests-32x32') {
    super(container, spritesheet);
  }


  draw(
    context: CanvasRenderingContext2D,
    position: Vector,
    rotation: number,
    origin: Vector,
    variant: SpriteVariant
  ){
    super.draw(context, position, rotation, origin, variant)
  }



}
