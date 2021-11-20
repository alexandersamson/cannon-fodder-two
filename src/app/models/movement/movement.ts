import {Vector} from "./vector";
import {Entity} from "../entities/entity";
import {Vector2d} from "../geometry/vector-2d";


export class Movement {

  //SPACIAL
  lastHypoth: number = 0;
  curPos: Vector = new Vector(0,0,0);
  lastPos: Vector = new Vector(0,0,0);
  speedCurrent: Vector = new Vector(0,0,0);
  speedMin: Vector = new Vector(0.4,0.4,0.4);
  speedMax: Vector = new Vector(2,2,2);
  speedAcc: Vector = new Vector(0.4,0.4,0.4);
  moveWaypoints: Array<Vector> = [];
  repeatWaypoints: boolean = false; //to add a patrolling system

  //ROTATION
  lastAngle: number = 0;
  rot: number = 0;
  speedRot: number = 1; // m/s
  moveRot: number = 0;

  constructor() {
  }

  moveByKeyboard(up:boolean, left:boolean, down:boolean, right:boolean){
    let moveX = 0;
    let moveY = 0;
    if(up){
      moveY += Math.min(this.speedCurrent.y, -this.speedMin.y)
    } else if(down){
      moveY += Math.max(this.speedCurrent.y, this.speedMin.y)
    } else {
      this.speedCurrent.y = 0;
    }

    if(left){
      moveX += Math.min(this.speedCurrent.x, -this.speedMin.x)
    } else if(right){
      moveX += Math.max(this.speedCurrent.x, this.speedMin.x)
    } else {
      this.speedCurrent.x = 0;
    }

    //console.log(this.speedCurrent.x, this.speedCurrent.y);

    let angle = Math.atan2(moveY, moveX);
    //console.log(angle)
    let accelerate = new Vector2d(
      (Math.cos(angle) * this.speedAcc.x),
      (Math.sin(angle) * this.speedAcc.y)
    )
    this.speedCurrent.x += accelerate.x
    this.speedCurrent.y += accelerate.y

    this.speedCurrent.x = Math.max( -this.speedMax.x, this.speedCurrent.x);
    this.speedCurrent.x = Math.min( this.speedMax.x, this.speedCurrent.x);
    this.speedCurrent.y = Math.max( -this.speedMax.y, this.speedCurrent.y);
    this.speedCurrent.y = Math.min( this.speedMax.y, this.speedCurrent.y);

    this.curPos.x += this.speedCurrent.x;
    this.curPos.y += this.speedCurrent.y;
    this.lastPos = {...this.curPos};
  }

  //Add new route to end of waypoints
  addWaypoint(position: Vector){
    this.moveWaypoints.push({...position})
    this.updateMoveDirectionAngle();
  }

  //Puts a new waypoint at the beginning, replacing the current move-order, but not deleting that order
  addDetour(position: Vector){
    this.moveWaypoints.unshift({...position})
    this.updateMoveDirectionAngle();
  }

  //Clear waypoints and directly move to the target
  moveTo(position: Vector){
    //TODO: Add pathfinding
    this.moveWaypoints = [];
    this.addWaypoint(position);
    this.updateMoveDirectionAngle();

  }

  isAtPos(position: Vector = this.moveWaypoints[0]){
    return position.x === this.curPos.x && position.y === this.curPos.y && position.z === this.curPos.z;
  }

  isMoving():boolean{
    for(const [key, val] of Object.entries(this.speedCurrent)){
      if(val > 0){
        return true;
      }
    }
    return false;
  }

  accelerate(bypass: boolean = false){
    if(!bypass && !this.moveWaypoints.length){
      return;
    }
    let angle:number;
    if(bypass){
      angle = this.moveRot;
    } else {
      angle = this.lastAngle;
    }
    let accelerate = new Vector();
    accelerate.x = Math.cos(angle) * this.speedAcc.x;
    accelerate.y = Math.sin(angle) * this.speedAcc.y;
    accelerate.z = 0;

    for (const [key, value] of Object.entries(this.curPos)){
      let k = key as keyof Vector;
      if (this.speedCurrent[k] < this.speedMax[k]) {
        if (this.speedCurrent[k] < this.speedMin[k]) {
          this.speedCurrent[k] = this.speedMin[k];
        }
        this.speedCurrent[k] += accelerate[k];
      }
    }
    if (this.speedCurrent.x > this.speedMax.x * Math.cos(angle)) {
      this.speedCurrent.x = this.speedMax.x * Math.cos(angle);
    }
    if (this.speedCurrent.y > this.speedMax.y * Math.sin(angle)) {
      this.speedCurrent.y = this.speedMax.y * Math.sin(angle);
    }
  }

  decelerate(){
    for (const [key, value] of Object.entries(this.curPos)) {
      let k = key as keyof Vector;
      if (this.speedCurrent[k] < this.speedMax[k]) {
        this.speedCurrent[k] += this.speedAcc[k];
        if (this.speedCurrent[k] > this.speedMax[k]) {
          this.speedCurrent[k] = this.speedMax[k];
        }
      }
    }
  }

  stop(){
    for (const [key, value] of Object.entries(this.curPos)) {
      let k = key as keyof Vector;
      this.speedCurrent[k] = 0;
      this.moveWaypoints = [];
    }
  }

  //When reached a destination, remove the moveTo position
  reachedWaypoint(){
    let wayPoint = this.moveWaypoints.shift();
    if(this.repeatWaypoints && wayPoint && this.moveWaypoints.length >= 1){
      //When there are waypoints left (2 or more in total) and repeat is 'on', then reinsert the reached waypoint.
      this.addWaypoint(wayPoint); // re-insert the waypoint as patrolling route
    }
    this.updateMoveDirectionAngle();
    if(this.moveWaypoints.length < 1){
      this.stop();
    }
  }


  //The mover that is called to move the unit
  updateMove(bypass: boolean = false){
    if(!this.moveWaypoints.length && !bypass){
      return;
    }
    if(!bypass && this.isAtPos()){
      this.reachedWaypoint();
      return;
    }

    this.accelerate(bypass);
    this.lastPos = {...this.curPos};
    this.curPos.x += this.speedCurrent.x;
    this.curPos.y += this.speedCurrent.y;
    if(!bypass) {
      let hypoth = Math.hypot(this.curPos.x - this.moveWaypoints[0].x, this.curPos.y - this.moveWaypoints[0].y)
      if (hypoth > this.lastHypoth) {
        this.reachedWaypoint();
      } else {
        this.updateMoveDirectionAngle();
        this.lastHypoth = hypoth;
      }
    }

  }

  faceToTarget(direction: Vector = this.moveWaypoints[0]){
    this.rot = Math.atan2(direction.y-this.curPos.y, direction.x-this.curPos.x);
  }


  updateMoveDirectionAngle(direction: Vector = this.moveWaypoints[0]){
    if(!this.moveWaypoints.length){
      return;
    }
    if(this.isAtPos(direction)){
      return;
    }
    this.lastAngle = Math.atan2(direction.y-this.curPos.y, direction.x-this.curPos.x);
    this.rot = this.lastAngle; //TODO: Different method for this
    this.lastHypoth = Math.hypot(this.curPos.x-direction.x,this.curPos.y-direction.y);
  }

  isInRangeOf(entity: Entity, range: number){
    let myPos = this.curPos;
    let theirPos = entity.movement.curPos;
    let dist = ((theirPos.x-myPos.x)*(theirPos.x-myPos.x)) + ((theirPos.y-myPos.y)*(theirPos.y-myPos.y));
    range *= range;
    return(dist <= range)
  }

  getInRangeOf(entity: Entity, range: number){
    if(this.isInRangeOf(entity, range)){
      return; //already in range
    }
    if(range < 5){
      range = 5;
    }
    let thisPos = this.curPos;
    let targetPos = {...entity.movement.curPos};
    let tan = Math.atan2(thisPos.y-targetPos.y, thisPos.x-targetPos.x);
    let inRangeOfSource = new Vector(
      targetPos.x += Math.cos(tan) * (range-4),
      targetPos.y += Math.sin(tan) * (range-4)
    )
    this.moveTo(targetPos);
  }
}
