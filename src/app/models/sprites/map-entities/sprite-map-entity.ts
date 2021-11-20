import {ISpriteUnit} from "../ISprite-unit";
import {Vector} from "../../movement/vector";
import {SpriteVariant} from "../sprite-variant";
import {GameContainer} from "../../gameplay/game-container";
import {ISpriteMapEntity} from "../ISprite-map-entity";
import {Sprite} from "../sprite";

export class SpriteMapEntity extends Sprite implements ISpriteMapEntity
{
  //From Interface ISPrite
  name: string = "map entity sprite";
  originOffset: Vector = new Vector();
  rotation: number = 0;
  toolHoldingOffset: Vector = new Vector();
  tileSize: number;

  //From Interface IBasicPositions
  spriteVariants: {
    idle: SpriteVariant,
    damaged: SpriteVariant,
    broken: SpriteVariant,
    open: SpriteVariant,
    steppedOn: SpriteVariant,
  } = {
    idle: new SpriteVariant(),
    damaged: new SpriteVariant(),
    broken: new SpriteVariant(),
    open: new SpriteVariant(),
    steppedOn: new SpriteVariant()
    }

  constructor(container: GameContainer) {
    super(container, 'sprite-map-tileset');
    this.tileSize =  50;
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
      spritesheet)
  }

}
