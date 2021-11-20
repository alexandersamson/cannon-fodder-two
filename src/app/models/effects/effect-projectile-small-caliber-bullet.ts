import {Vector} from "../movement/vector";
import {GameViewport} from "../game-canvas/game-viewport";
import {EffectProjectile} from "./effect-projectile";
import {Color} from "./color";

export class EffectProjectileSmallCaliberBullet extends EffectProjectile{
  constructor() {
    super();
    this.radius = 5;
    this.size = new Vector(7,1.5,0)
    this.rotation = 0;
    this.colorStart = new Color(255,224,128,250);
    this.colorEnd = new Color(200,110,60,36);
  }

 draw(viewPort: GameViewport, ctx: CanvasRenderingContext2D, position: Vector = this.startPos, rotation: number = this.rotation) {
   super.draw(viewPort, ctx, position, rotation);
 }

}
