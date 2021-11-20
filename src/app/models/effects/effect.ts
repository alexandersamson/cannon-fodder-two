import {GenericPropertiesLean} from "../generic-properties-lean";
import {GameContainer} from "../gameplay/game-container";
import {Vector} from "../movement/vector";
import {Color} from "./color";

export class Effect extends GenericPropertiesLean{
  //LIFESPAN
  lifespan: number = 250;
  lifespanMax: number = 250;
  repeat: boolean = false;
  removeAtExpiration = true;

  //COORDS
  startPos: Vector = { x:0, y:0, z:0};
  endPos:   Vector = { x:0, y:0, z:0};

  //COSMETICS
  colorStart: Color = new Color(255,255,255,255);
  colorEnd: Color = new Color(255,255,255,255);

  lineWidthStart: number = 2;
  lineWidthEnd: number = 2;
  scatterAtEnd: number = 0;
  scatterAtStart: number = 0;

  constructor() {
    super();
  }

  processLifespan(container: GameContainer, framerate: number){
    if(this.lifespan > 0){
      this.lifespan -= 1000/framerate;
      if(this.lifespan < 0) {
        this.lifespan = 0;
      }
    } else {
      if (this.repeat) {
        this.lifespan = this.lifespanMax;
      } else if(this.removeAtExpiration) {
        let index = container.effects.findIndex(effect => {
          return effect === this;
        })
        if(index > -1) {
          container.effects[index].lifespan = this.lifespanMax; //apparently the object still remains a property of the unit/item
          container.effects.splice(index, 1);
        }
      } else {
        this.lifespan = 0;
      }
    }
  }

  getColor():string{
    let colorString = '#';
    for (const [key, value] of Object.entries(new Color())){
      const k = key as keyof Color;
      colorString += Math.round(<number>this.colorStart[k] + ((<number>this.colorEnd[k] - <number>this.colorStart[k]) * (1-(this.lifespan/this.lifespanMax)))).toString(16).padStart(2,'0');
    }
    return colorString;
  }


  getLineWidth(){
    return this.lineWidthStart + ((this.lineWidthEnd - this.lineWidthStart) * (1-(this.lifespan/this.lifespanMax)));
  }


  getScatterVector(currentVector: Vector, scatter: number, missed: boolean, critical: boolean):Vector{
    if(scatter > 0) {
      let neg = critical ? (-(scatter)/3) : -(scatter);
      let pos = critical ? ((scatter)/3) : (scatter);
      currentVector.x = currentVector.x + (Math.random() * (neg - pos + 1)) + pos;
      currentVector.y = currentVector.y + (Math.random() * (neg - pos + 1)) + pos;
      if(missed){
        if(Math.random() > 0.50){
          currentVector.x += (Math.random() * (scatter + 1)) + scatter + 1 + (8-scatter);
        } else {
          currentVector.x -= (Math.random() * (scatter + 1)) + scatter + 1 + (8-scatter);
        }
        if(Math.random() > 0.50){
          currentVector.y += (Math.random() * (scatter + 1)) + scatter + 1 + (8-scatter);
        } else {
          currentVector.y -= (Math.random() * (scatter + 1)) + scatter + 1 + (8-scatter);
        }
      }
      return currentVector;
    }
    return currentVector;
  }

}
