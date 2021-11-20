import {GenericPropertiesLean} from "../generic-properties-lean";
import {Vector} from "../movement/vector";
import {Entity} from "../entities/entity";
import {EffectPoint} from "../effects/effect-point";
import {EffectProjectile} from "../effects/effect-projectile";
import {EffectLine} from "../effects/effect-line";
import {MovementZone} from "../armor-classes/movement-zone";
import {MovementZones} from "../armor-classes/movement-zones";
import {Damage} from "../combat/damage";
import {GameContainer} from "../gameplay/game-container";
import {Line} from "../geometry/line";
import {Vector2d} from "../geometry/vector-2d";
import {MapEntity} from "../game-map/map-entities/map-entity";
import {Unit} from "../units/unit";
import {Tool} from "../tools/tool";
import {Weapon} from "../weapons/weapon";


export class Projectile extends GenericPropertiesLean{
  source: Entity = new Entity();
  tool: Tool | Weapon = new Tool();
  trajectory: Line = new Line(new Vector2d(0,0), new Vector2d(0,0));
  trajectoryOriginal: Line = new Line(new Vector2d(0,0), new Vector2d(0,0));
  trajectoryForRayCollissionDetection: Line = new Line(new Vector2d(0,0), new Vector2d(0,0));
  speedCurrent: Vector = new Vector();
  speedStart: Vector = new Vector(0,0,0);
  speedMin: Vector = new Vector(0,0,0);
  speedMax: Vector = new Vector(0,0,0);
  acceleration: Vector = new Vector(0.5,0.5,0.5);
  minRange: number = 0; // Minimal range to operate
  maxEffectiveRange: number = 100; //How far away from the origin can the player click to fire

  //BULLET TYPES
  isBulletType: boolean = true; //Does this projectile act like a bullet? Moving in straight line and impacts on first collision. Also can travel further than max range, using the max impact range.
  maxImpactRange: number = 500; //How far can the projectile travel?
  damageDropByRangeFactor = 0.8; // How much does the damage drop at the reached maxImpactRange?

  rotation: number = 0;
  rotationSpeed: number = 0.05; //for homing purposes
  spreadRadiusMin: number = 0; //spread at the spreadZeroedInRange range. Will be less closer by, will be more further away
  spreadRadiusMax: number = 8; //spread at the spreadZeroedInRange range. Will be less closer by, will be more further away
  spreadZeroedInRange: number = 100; // about 100.
  homing: boolean = false;
  lockedTarget: Entity | undefined;
  impactsLeft: number = 1;
  impactsOnTargetProximity: boolean = true; //True for bombs and some rocket types. False for bullets. They go straight unit hitting something.
  impactProximityFuseRange: number = 1; // When this close to the target, it will go off.
  impactsOnObstruction: boolean = true; // does the projectile explodes on first contact with anything on it's path?
  timerSet: number = 750; // max lifetime of the projectile
  timerCurrent: number = 750;
  impactsOnTimeOut: boolean = true;
  movementZones: Array<MovementZone> = [MovementZones.LAND, MovementZones.AIR, MovementZones.WATER, MovementZones.SPACE, MovementZones.WINDOW];
  usesTargetMovementZone: boolean = true; //This means for a rocket as example: When attacking air, the projectile wont be blocked by walls, since it flys over them, but when attacking ground, it will.

  fxLaunch: Array<EffectPoint | EffectLine> = [];
  fxProjectile: Array<EffectProjectile> = [];
  fxImpact: Array<EffectPoint> = [];

  damageOnImpact: Damage = new Damage(); //Damage done on impact
  damageOnTouch: Damage | undefined = undefined; //Damage done on collision with the projectile, without impacting
  prototype: any;
  constructor() {
    super();
  }

  drawProjectile(container: GameContainer){
    this.fxProjectile.forEach(fx => {
      let newFx = Object.create(fx);
      newFx.startPos = {...this.trajectory.start};
      newFx.rotation = this.rotation;
      container.effects.push(newFx)
    })
  }

  launch(container: GameContainer, tool:Tool|Weapon, source: Entity, target: Vector | Entity){
    this.source = source;
    this.tool = tool;
    this.trajectory.start = source.getCastingPoint()
    this.speedCurrent = {...this.speedStart}
    if(target instanceof Entity){
      this.trajectory.end = {...target.movement.curPos}
      this.lockedTarget = target;
    } else {
      this.trajectory.end = {...target}
    }
    this.trajectory.end = this.getSpreadPos(this.trajectory.start, this.trajectory.end);
    this.setInitialRotation(); //get the rotation
    if(this.isBulletType){ //If this is a bullet, we need to change the end target, to the max impact range, since a missing bullet should be able to hit things beyond the intended target
      let x = this.trajectory.start.x + Math.cos(this.rotation) * this.maxImpactRange;
      let y = this.trajectory.start.y + Math.sin(this.rotation) * this.maxImpactRange;
      this.trajectory.end = {x:x,y:y};
    }
    //Add spread


    //fix the original trajectory
    this.trajectoryOriginal.start = {...this.trajectory.start};
    this.trajectoryOriginal.end = {...this.trajectory.end};
    container.projectiles.push(this);
    this.drawProjectile(container);
  }

  //The process loop needs to call this
  move(container:GameContainer){
    let time = 1000/container.framerate;
    this.timerCurrent = Math.max(this.timerCurrent - time, 0);
    if(this.lockedTarget && this.homing){
      this.trajectory.end = this.lockedTarget.movement.curPos;
      this.rotateTowardsTarget();
    }
    this.speedCurrent.x = Math.cos(this.rotation)*this.speedStart.x;
    this.speedCurrent.y = Math.sin(this.rotation)*this.speedStart.y;
    this.speedStart.x += this.acceleration.x;
    if(this.speedStart.x < 0){
      this.speedStart.x = 0;
    }
    this.speedStart.y += this.acceleration.y;
    if(this.speedStart.y < 0){
      this.speedStart.y = 0;
    }
    let deltaX = this.speedCurrent.x * (time/1000);
    let deltaY = this.speedCurrent.y * (time/1000);
    if(deltaX > 0.1 || deltaX < -0.1 || deltaY > 0.1 || deltaY < 0.1){
      //We need to do some more advanced collision detection, since the projectile is moving fast enough
      let lineExtensionPointForCollDetection = new Vector2d(
        this.trajectory.start.x + (this.speedCurrent.x/35),
        this.trajectory.start.y + (this.speedCurrent.y/35)
      )
      this.trajectoryForRayCollissionDetection = new Line(this.trajectory.start, lineExtensionPointForCollDetection)
      let tile = container.collision.projectileToMapCollisionDetection(container, this);
      let unit = container.collision.projectileToUnitCollisionDetection(container, this, this.source);
      if(tile || unit){
        let target: {entity:Unit|MapEntity, pos:Vector2d} | undefined = undefined;
        if(tile && unit){
          if(
            new Line(this.trajectoryOriginal.start, tile.pos).getLength() >
            new Line(this.trajectoryOriginal.start, unit.pos).getLength()
          ) {
            target = {entity: unit.entity, pos:unit.pos}
          } else{
            target = {entity: tile.entity, pos:tile.pos}
          }
        } else if(tile){
          target = {entity: tile.entity, pos:tile.pos}
        } else if(unit) {
          target = {entity: unit.entity, pos: unit.pos}
        } else {
          return;
        }
        if(this.impactsLeft) {
          this.impact(container, target.entity, target.pos);
        }
        return;
      }
    }
    this.trajectory.start.x += deltaX
    this.trajectory.start.y += deltaY
    this.drawProjectile(container);
  }

  getDamageFactorByRange():number{
    if(this.isBulletType && this.damageDropByRangeFactor){
      let distanceTraveled:number = new Line(this.trajectoryOriginal.start, this.trajectory.start).getLength();
      if(distanceTraveled > this.trajectoryOriginal.getLength()){
        return 1 - this.damageDropByRangeFactor;
      }
      return  1 - ((distanceTraveled/this.trajectoryOriginal.getLength()) * this.damageDropByRangeFactor)
    }
    return 1;
  }

  getSpreadPos(startPos: Vector2d, endPos: Vector2d){
    let distanceToMaxRadiusFactor = new Line(startPos, endPos).getLength()/this.spreadZeroedInRange // about 100-150 or something.
    let angle = Math.random()*Math.PI*2;
    let distance = this.spreadRadiusMin + (Math.random() * ((this.spreadRadiusMax*distanceToMaxRadiusFactor) - (this.spreadRadiusMin*distanceToMaxRadiusFactor)));
    let x = Math.cos(angle)*distance;
    let y = Math.sin(angle)*distance;
    return new Vector2d(endPos.x+x,endPos.y+y);
  }


  impact(container: GameContainer, target: Entity | MapEntity | Vector2d, pos: Vector2d = this.trajectory.start){
    if(this.impactsLeft < 1){
      return;
    }
    this.impactsLeft -= 1;
    if(target instanceof Unit){
      let x = (target.movement.curPos.x + pos.x)/2
      let y = (target.movement.curPos.y + pos.y)/2
      this.trajectory.end = {x:x,y:y}; //position of unit
    } else {
      this.trajectory.end = {...pos}; //position of provided position.
    }
    for(let i = 0; i < this.damageOnImpact.amounts.length; i++){
      let damage = this.damageOnImpact.amounts[i]
      damage.amount *= this.getDamageFactorByRange();
      let entities = this.getAllEntitiesInRangeOf(container,this.trajectory.end,damage.radius)
      entities.forEach(entity => {
        if(this.tool instanceof Weapon) {
          this.damageOnImpact.processWeaponDamage(container, damage.amount, this.tool, this.source, entity)
        }
      })
    }
    if(this.fxImpact){
      this.fxImpact.forEach(fx => {
        fx.startPos = {...this.trajectory.end as Vector}
        container.effects.push(fx)
      })
    }
    this.trajectory.start = {...this.trajectory.end};
    this.drawProjectile(container);
    this.timerCurrent = 0; //cheap way to kill it.
  }


  public setInitialRotation(){
    this.rotation = this.getRotation();
  }

  public getRotation(){
    return this.trajectory.getAngle();
  }

  public rotateTowardsTarget(){
    if((this.rotation - this.getRotation()+(Math.PI*2))%(Math.PI*2) > Math.PI){
      this.rotation += this.rotationSpeed
    } else {
      this.rotation -= this.rotationSpeed
    }
  }

  getAllEntitiesInRangeOf(container: GameContainer, point: Vector | Vector2d, range: number){
    let entitiesInRange: Array<Entity> = [];
    let allEntities = container.getAllEntities()
    allEntities.forEach(category =>{
      category.forEach(entity => {
        let theirPos = entity.movement.curPos
        let targetRadius = (entity.size.x+entity.size.y)/4
        let rangeVal = range;
        if(point.x < (theirPos.x-(rangeVal + targetRadius)) || point.x > (theirPos.x+(rangeVal + targetRadius))){
          return; //early return; out of range
        }
        if(point.y < (theirPos.y-(rangeVal + targetRadius)) || point.y > (theirPos.y+(rangeVal + targetRadius))){
          return; // early return; out of range
        }
        let dist = ((theirPos.x-point.x)*(theirPos.x-point.x)) + ((theirPos.y-point.y)*(theirPos.y-point.y));
        rangeVal += targetRadius;
        rangeVal *= rangeVal
        if(dist <= rangeVal){
          entitiesInRange.push(entity);
        }
      })
    })
    return entitiesInRange;
  }

}
