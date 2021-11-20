import {Vector2d} from "./vector-2d";

export class Line {
  start: Vector2d;
  end: Vector2d;
  constructor(start:Vector2d, end:Vector2d) {
    this.start = start;
    this.end = end;
  }

  getAngle(){
    return Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x);
  }

  getLength(){
    return Math.sqrt( ((this.end.x-this.start.x) * (this.end.x-this.start.x)) + ((this.end.y-this.start.y) * (this.end.y-this.start.y)) )
  }
}
