import {ISpriteUnit} from "../ISprite-unit";
import {Vector} from "../../movement/vector";
import {SpriteUnitTurrets} from "./turrets/sprite-unit-turrets";
import {SpriteVariant} from "../sprite-variant";
import {Sprite} from "../sprite";
import {GameContainer} from "../../gameplay/game-container";

export class SpriteUnit extends Sprite implements ISpriteUnit
{
  //From Interface ISPrite
  name: string = "unit sprite";
  originOffset: Vector = new Vector();
  rotation: number = 0;
  toolHoldingOffset: Vector = new Vector();

  //From Interface IBasicPositions
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
  } = {
    idle: new SpriteVariant(),
    damaged: new SpriteVariant(),
    broken: new SpriteVariant(),
    walking: new SpriteVariant(),
    rotating: new SpriteVariant(),
    running: new SpriteVariant(),
    moving: new SpriteVariant(),
    flying: new SpriteVariant(),
    swimming: new SpriteVariant(),
    attacking: new SpriteVariant(),
    constructing: new SpriteVariant(),
    mining: new SpriteVariant(),
    }
  //TURRET
  hasTurret: boolean = false;
  turret: SpriteUnitTurrets | undefined;


  constructor(container: GameContainer, spritesheet: string = 'spritesheet-units-men') {
    super(container, spritesheet);
  }


  draw(
    context: CanvasRenderingContext2D,
    position: Vector,
    rotation: number,
    origin: Vector,
    variant: SpriteVariant,
    spritesheet: HTMLImageElement | undefined = undefined,
  ){
    super.draw(
      context,
      position,
      rotation,
      origin,
      variant,
      spritesheet
    )
  }

}
