import {Vector2d} from "./vector-2d";
import {Line} from "./line";

export class Rectangle {
  pos: Vector2d;
  size: Vector2d;
  rot: number;
  lines: Array<Line>
  constructor(pos: Vector2d, size: Vector2d, rot:number = 0) {
    this.pos = pos;
    this.size = size;
    this.rot = rot;
    this.lines = [];
    this.setLines(pos, size, rot);
  }

  setLines(pos: Vector2d, size: Vector2d, rot:number){
    let top = new Line(new Vector2d(pos.x, pos.y), new Vector2d(pos.x + size.x, pos.y));
    let right = new Line(new Vector2d(pos.x + size.x, pos.y), new Vector2d(pos.x + size.x, pos.y+ size.y));
    let bottom = new Line(new Vector2d(pos.x + size.x, pos.y+ size.y), new Vector2d(pos.x, pos.y + size.y));
    let left = new Line(new Vector2d(pos.x, pos.y + size.y), new Vector2d(pos.x, pos.y));
    this.lines.push(top,right,bottom,left)
  }

  getLines():Array<Line>{
    return this.lines
  }
}
