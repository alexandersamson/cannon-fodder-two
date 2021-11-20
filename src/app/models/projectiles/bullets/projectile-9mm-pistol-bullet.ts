import {Vector} from "../../movement/vector";
import {EffectPoint} from "../../effects/effect-point";
import {EffectProjectile} from "../../effects/effect-projectile";
import {EffectLine} from "../../effects/effect-line";
import {MovementZones} from "../../armor-classes/movement-zones";
import {Damage} from "../../combat/damage";
import {Projectile} from "../projectile";
import {EffectProjectileSmallCaliberBullet} from "../../effects/effect-projectile-small-caliber-bullet";

import {Line} from "../../geometry/line";
import {Vector2d} from "../../geometry/vector-2d";
import {EffectPointEnergyWeaponImpactSmall} from "../../effects/effect-point-energy-weapon-impact-small";
import {EffectPointGunshotImpact} from "../../effects/effect-point-gunshot-impact";
import {EffectPointGunshotImpactSpread} from "../../effects/effect-point-gunshot-impact-spread";
import {DamageSpreadFactor} from "../../combat/damage-spread-factor";

export class Projectile9mmPistolBullet extends Projectile{

  fxLaunch: Array<EffectPoint | EffectLine> = [];
  fxProjectile: Array<EffectProjectile> = [new EffectProjectileSmallCaliberBullet()];
  fxImpact: Array<EffectPoint> = [new EffectPointGunshotImpact(), new EffectPointGunshotImpactSpread()];

  damageOnImpact: Damage = new Damage(); //Damage done on impact
  damageOnTouch: Damage | undefined = undefined; //Damage done on collision with the projectile, without impacting
  constructor() {
    super();
    this.trajectory = new Line(new Vector2d(0,0), new Vector2d(0,0));
    this.speedCurrent = new Vector();
    this.speedStart = new Vector(1500,1500,1500);
    this.speedMin = new Vector(0,0,0);
    this.speedMax = new Vector(1500,1500,1500);
    this.acceleration = new Vector(-50,-50,-50); //Bullets do lose speed over time; they decelerate.
    this.impactsOnTargetProximity = false; // Bullets wil go on and on forever
    this.timerSet = 500; //Bullets dont need to live long
    this.timerCurrent = 500;
    this.rotationSpeed = 0.08;
    this.homing = false; // Bullets don't home in
    this.usesTargetMovementZone = true;
    this.impactsOnObstruction = true;
    this.movementZones = [MovementZones.LAND, MovementZones.AIR, MovementZones.WATER, MovementZones.SPACE, MovementZones.WINDOW];
    this.prototype = this.constructor

    //BULLET TYPES
    this.maxEffectiveRange = 75;
    this.isBulletType = true; //Does this projectile act like a bullet? Moving in straight line and impacts on first collision. Also can travel further than max range, using the max impact range.
    this.maxImpactRange = 250; //How far can the projectile travel?
    this.damageDropByRangeFactor = 0.7; // How much does the damage drop at the reached maxImpactRange?
    this.damageOnImpact.amounts = [(new DamageSpreadFactor(1, 16))];
    this.spreadRadiusMax = 10;
  }


}
