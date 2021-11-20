export class GameCanvasProperties {
  private readonly xBase: number;
  private readonly yBase: number;
  private yCurrent = 540;
  private xCurrent = 960;
  private scale = 1;
  private id: string;

  constructor(w:number = 960, h:number = 540, id:string = '#game-canvas') {
    this.yBase = h;
    this.xBase = w;
    this.id = id;
  }

  setScale(scale: number) {
    if(scale > 0.25 && scale < 2) {
      this.scale = scale
    }
  }

  getScale() {
      return this.scale * 0.625;
  }

  setWidth(value: number){
    if(value < this.xBase/2) {
      value = this.xBase/2;
    } else if (value > this.xBase*2){
      value = this.xBase*2;
    }
    this.xCurrent = value;
    this.yCurrent = (value/this.xBase)*this.yBase;
    this.scale = this.xCurrent/this.xBase;
  }

  setHeight(value: number){
    if(value < this.yBase/2) {
      value = this.yBase/2;
    } else if (value > this.yBase*2){
      value = this.yBase*2;
    }
    this.yCurrent = value;
    this.xCurrent = (value/this.yBase)*this.xBase;
    this.scale = this.yCurrent/this.yBase;
  }

  getId(){
    return this.id;
  }

  getWidth(){
    return this.xCurrent;
  }

  getHeight(){
    return this.yCurrent;
  }
}
