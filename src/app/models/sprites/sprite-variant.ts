import {Vector} from "../movement/vector";

export class SpriteVariant{
  currentFrame: number = 0;
  frameRate: number = 30; //30 times per second
  frames: [{pos: Vector, size: Vector, scale: number}] = [{pos: {x:50,y:50,z:0}, size: {x:50,y:50,z:0}, scale: 1}];
}
