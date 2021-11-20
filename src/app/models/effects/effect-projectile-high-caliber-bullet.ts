import {Vector} from "../movement/vector";
import {GameViewport} from "../game-canvas/game-viewport";
import {EffectProjectile} from "./effect-projectile";
import {Color} from "./color";

export class EffectProjectileHighCaliberBullet extends EffectProjectile{
  constructor() {
    super();
    this.radius = 5;
    this.size = new Vector(11,2.5,0)
    this.rotation = 0;
    this.colorStart = new Color(255,255,172,255);
    this.colorEnd = new Color(200,110,60,48);
  }

 draw(viewPort: GameViewport, ctx: CanvasRenderingContext2D, position: Vector = this.startPos, rotation: number = this.rotation) {
   super.draw(viewPort, ctx, position, rotation);
 }

}
