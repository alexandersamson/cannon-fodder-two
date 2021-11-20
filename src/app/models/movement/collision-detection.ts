import {Entity} from "../entities/entity";
import {MapEntity} from "../game-map/map-entities/map-entity";
import {Vector} from "./vector";
import {GameContainer} from "../gameplay/game-container";
import {Line} from "../geometry/line";
import {Rectangle} from "../geometry/rectangle";
import {Projectile} from "../projectiles/projectile";
import {Unit} from "../units/unit";
import {Vector2d} from "../geometry/vector-2d";

export class CollisionDetection {

  pointIsCollidingWithEntity(point: Vector, entity: Entity){
    return !((
        point.x > entity.movement.curPos.x + entity.size.x ||
        point.x < entity.movement.curPos.x
      ) ||
      (
        point.y > entity.movement.curPos.y + entity.size.y ||
        point.y < entity.movement.curPos.y
      ));
  }

  entityIsColliding(container: GameContainer, entity: Entity){
    if(!container.gameMap){
      return
    }
    let collided = false;
    //Check map object collissions
    container.gameMap.populationArray.forEach(mapEntity => {
      if(this.movementCollidesWithMapEntity(entity, mapEntity )){
        collided = true;
        return;
      }
    })
    return collided
  }



  movementCollidesWithMapEntity(entity: Entity, mapEntity: MapEntity, sourcePosition: Vector | undefined = undefined, sourceSize: Vector | undefined = undefined) {
    if (entity.armorClass) {
      let mzEntity = entity.armorClass.movementZones;
      let mzMapEntity = mapEntity.allowedMovementZonesDefault;
      if(mzEntity.some(item => mzMapEntity.includes(item))){
        return false;
      }
    }

    if(!sourcePosition){
      sourcePosition = entity.getPosition();
    }

    if(!sourceSize){
      sourceSize = entity.size;
    }

    let mEntitySize = mapEntity.tile.size
    let mEntityPos = mapEntity.tile.pos
    return !((
        sourcePosition.x > mEntityPos.x + mEntitySize.x ||
        sourcePosition.x + sourceSize.x < mEntityPos.x
      ) ||
      (
        sourcePosition.y > mEntityPos.y + mEntitySize.y ||
        sourcePosition.y + sourceSize.y < mEntityPos.y
      ));
  }

  projectileToMapCollisionDetection(container: GameContainer, projectile:Projectile): { entity: MapEntity, pos: Vector2d } | undefined{
    if(!container.gameMap){
      return
    }
    let map = container.gameMap;
    for(let i = 0; i < map.populationArray.length; i++){
      let mapEntity = map.populationArray[i];
      let tile = map.populationArray[i].tile;
      let trajectory = projectile.trajectoryForRayCollissionDetection;
      let collision = this.lineWallCollisionDetection(trajectory, tile);
      if(collision){
        if(!projectile.movementZones.some(r=> mapEntity.allowedMovementZonesDefault.includes(r))) {
          //console.log("collides at MapEntity: " + tile);
          return {entity:mapEntity, pos: collision};
        }
      }
    }
    return undefined
  }

  projectileToUnitCollisionDetection(container: GameContainer, projectile:Projectile, source: Entity | undefined): { entity: Unit, pos: Vector2d }  | undefined{
    if(!container.units){
      return
    }
    let units = container.units;
    for(let i = 0; i < units.length; i++){
      if(source && source === units[i]){
        //console.log(units[i]);
        continue;
      }
      let unitPos = units[i].movement.curPos;
      let trajectory = projectile.trajectoryForRayCollissionDetection;
      let hitboxSize = (units[i].size.x + units[i].size.y)/2
      let hitbox = new Rectangle({x:unitPos.x-units[i].origin.x, y:unitPos.y-units[i].origin.y}, {x:hitboxSize,y:hitboxSize});
      //console.log(hitbox);
      //console.log(trajectory.currentPos.x, trajectory.currentPos.y);
      let collision = this.lineWallCollisionDetection(trajectory, hitbox)
      if(collision){
        if(projectile.movementZones.some(r=> units[i].armorClass.movementZones.includes(r))) {
          //console.log("collides at Unit: " + units[i]);
          return {entity:units[i], pos: collision};
        }
      }
    }
    return undefined
  }


  // source of this snippet: http://www.jeffreythompson.org/collision-detection/line-rect.php
  lineWallCollisionDetection(line:Line, rectangle:Rectangle):Vector2d | undefined
  {
    let x1 = line.start.x; //source
    let y1 = line.start.y;
    let x2 = line.end.x; // target
    let y2 = line.end.y
    let rx = rectangle.pos.x;
    let ry = rectangle.pos.y;
    let rw = rectangle.size.x;
    let rh = rectangle.size.y;
    // check if the line has hit any of the rectangle's sides
    // uses the Line/Line function below
    let lines = rectangle.getLines();
    let collisions: Vector2d[] = [];

    //Get all possible collisions
    for(let i =0;i<rectangle.lines.length; i++){
      let lineCollision = this.lineLineCollision(line, lines[i]);
      if(lineCollision){
        collisions.push(lineCollision);
      }
    }

    //Get the closest collision;
    if(collisions.length){
      let closestRangeToTarget: number | undefined = undefined;
      let closestCollisionToTarget: Vector2d = {...line.start};
      for(let i = 0; i < collisions.length; i++){
        let tempLineTest = new Line(collisions[i], line.start)
        let tempLength = tempLineTest.getLength();
        if(!closestRangeToTarget || tempLength < closestRangeToTarget){
          closestRangeToTarget = tempLength;
          closestCollisionToTarget = collisions[i];
        }
      }
      //console.log(closestCollisionToTarget);
      return closestCollisionToTarget;
    }
    return undefined;
  }


  // source of this snippet: http://www.jeffreythompson.org/collision-detection/line-rect.php
  lineLineCollision(lineA: Line, lineB: Line): Vector2d | undefined
  {
    let x1 = lineA.start.x;
    let x2 = lineA.end.x;
    let y1 = lineA.start.y;
    let y2 = lineA.end.y;
    let x3 = lineB.start.x;
    let x4 = lineB.end.x;
    let y3 = lineB.start.y;
    let y4 = lineB.end.y;
    // calculate the direction of the lines
    let uA: number = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB: number = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if(uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1){
      return new Vector2d(
        x1 + (uA * (x2 - x1)),
        y1 + (uA * (y2 - y1))
      )
    }
    return undefined
  }

}
