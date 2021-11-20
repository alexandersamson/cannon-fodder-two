import {Vector} from "../movement/vector";
import {SpriteVariant} from "./sprite-variant";

export interface ISpriteBase {
  name: string;
  spritesheet: HTMLImageElement | undefined;
  rotation: number;
  originOffset: Vector;
  toolHoldingOffset: Vector;

  draw(
    context: CanvasRenderingContext2D,
    position: Vector,
    rotation: number,
    origin: Vector,
    variant: SpriteVariant,
    spritesheet: HTMLImageElement | undefined,
  ):void;
}
