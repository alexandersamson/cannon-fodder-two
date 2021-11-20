import {Vector} from "../movement/vector";
import {SpriteVariant} from "./sprite-variant";
import {ISpriteBase} from "./ISprite-base";
import {GameContainer} from "../gameplay/game-container";


export class Sprite implements ISpriteBase{

  name: string = "Base sprite class";
  originOffset: Vector = new Vector();
  rotation: number = 0;
  spritesheet: HTMLImageElement | undefined = undefined;
  toolHoldingOffset: Vector = new Vector();

  spriteVariants: {
    idle: SpriteVariant,
  } = {
    idle: new SpriteVariant()
  }

  constructor(container: GameContainer, spritesheet: string = 'spritesheet-default') {
    container.sprites.forEach(sprite => {
      if(sprite.title === spritesheet){
        this.spritesheet = sprite;
      }
    })
  }


  draw(
    context: CanvasRenderingContext2D,
    position: Vector,
    rotation: number,
    origin: Vector,
    variant: SpriteVariant,
    spritesheet: HTMLImageElement | undefined = this.spritesheet,
  ){
    if(!spritesheet || !spritesheet.title){
      return;
    }
    const frame = variant.currentFrame;
    const scale = variant.frames[frame].scale;
    if(rotation) {
      context.save();
      context.translate(position.x, position.y);
      context.rotate(rotation);
    }
    context.drawImage(
      spritesheet,
      variant.frames[frame].pos.x,
      variant.frames[frame].pos.y,
      variant.frames[frame].size.x,
      variant.frames[frame].size.y,
      rotation ? 0 - origin.x :(position.x - origin.x),
      rotation ? 0 - origin.x: (position.y - origin.y),
      variant.frames[frame].size.x * scale,
      variant.frames[frame].size.y * scale
    )
    if(rotation) {
      context.restore();
    }
  }
}
