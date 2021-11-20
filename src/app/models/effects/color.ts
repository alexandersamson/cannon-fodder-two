export class Color {
  r:number;
  g:number;
  b:number;
  t:number;

  constructor(r:number = 0, g:number = 0, b:number = 0, t:number = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.t = t;
  }

  getCssColorString(){
    return `#${Math.floor(this.r).toString(16).padStart(2,'0')}${Math.floor(this.g).toString(16).padStart(2,'0')}${Math.floor(this.b).toString(16).padStart(2,'0')}${Math.floor(this.t).toString(16).padStart(2,'0')}`;
  }
}
