import {Vector} from "../movement/vector";
import {GameViewport} from "../game-canvas/game-viewport";
import {EffectProjectile} from "./effect-projectile";
import {Color} from "./color";

export class EffectProjectileMediumCaliberBullet extends EffectProjectile{
  constructor() {
    super();
    this.radius = 5;
    this.size = new Vector(9,2,0)
    this.rotation = 0;
    this.colorStart = new Color(255,255,148,250);
    this.colorEnd = new Color(200,110,60,48);
  }

 draw(viewPort: GameViewport, ctx: CanvasRenderingContext2D, position: Vector = this.startPos, rotation: number = this.rotation) {
   super.draw(viewPort, ctx, position, rotation);
 }

}
