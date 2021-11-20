import {Vector} from "../../movement/vector";
import {EffectPoint} from "../../effects/effect-point";
import {EffectProjectile} from "../../effects/effect-projectile";
import {EffectLine} from "../../effects/effect-line";
import {MovementZones} from "../../armor-classes/movement-zones";
import {Damage} from "../../combat/damage";
import {Projectile} from "../projectile";
import {Line} from "../../geometry/line";
import {Vector2d} from "../../geometry/vector-2d";
import {EffectPointGunshotImpact} from "../../effects/effect-point-gunshot-impact";
import {EffectPointGunshotImpactSpread} from "../../effects/effect-point-gunshot-impact-spread";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";
import {EffectProjectileMediumCaliberBullet} from "../../effects/effect-projectile-medium-caliber-bullet";
import {EffectProjectileHighCaliberBullet} from "../../effects/effect-projectile-high-caliber-bullet";
import {effectPointRocketImpactSmallSpread} from "../../effects/effect-point-rocket-impact-small-spread";
import {effectPointRocketImpactSmall} from "../../effects/effect-point-rocket-impact-small";

export class ProjectileRocketPmlMissile extends Projectile{

  fxLaunch: Array<EffectPoint | EffectLine> = [];
  fxProjectile: Array<EffectProjectile> = [new EffectProjectileHighCaliberBullet()];
  fxImpact: Array<EffectPoint> = [new effectPointRocketImpactSmall(), new effectPointRocketImpactSmallSpread()];

  damageOnImpact: Damage = new Damage(); //Damage done on impact
  damageOnTouch: Damage | undefined = undefined; //Damage done on collision with the projectile, without impacting
  constructor() {
    super();
    this.trajectory = new Line(new Vector2d(0,0), new Vector2d(0,0));
    this.speedCurrent = new Vector();
    this.speedStart = new Vector(20,20,20);
    this.speedMin = new Vector(0,0,0);
    this.speedMax = new Vector(200,200,200);
    this.acceleration = new Vector(10,10,10); //Bullets do lose speed over time; they decelerate.
    this.impactsOnTargetProximity = false; // Bullets wil go on and on forever
    this.timerSet = 2000; //Bullets dont need to live long
    this.timerCurrent = 2000;
    this.rotationSpeed = 0.05;
    this.homing = true; // Missiles home in, rockets don't
    this.usesTargetMovementZone = true;
    this.impactsOnObstruction = true;
    this.movementZones = [MovementZones.LAND, MovementZones.AIR, MovementZones.WATER, MovementZones.SPACE, MovementZones.WINDOW];
    this.prototype = this.constructor

    //BULLET TYPES
    this.maxEffectiveRange = 300;
    this.isBulletType = true; //Does this projectile act like a bullet? Moving in straight line and impacts on first collision. Also can travel further than max range, using the max impact range.
    this.maxImpactRange = 350; //How far can the projectile travel?
    this.damageDropByRangeFactor = 0; // How much does the damage drop at the reached maxImpactRange?
    this.damageOnImpact.amounts = [(new DamageSpreadFactor(100, 50)),(new DamageSpreadFactor(50, 250))];
    this.spreadRadiusMax = 10;
  }


}
