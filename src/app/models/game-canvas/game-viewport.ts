import {Vector} from "../movement/vector";
import {Entity} from "../entities/entity";
import {MapEntity} from "../game-map/map-entities/map-entity";
import {Vector2d} from "../geometry/vector-2d";


export class GameViewport {
  curPos: Vector = {x:0,y:0,z:0}; //about in the center?
  dimensions: Vector = {x:0,y:0,z:0};
  minPos: Vector = {x:0,y:0,z:0};
  maxPos: Vector = {x:2000,y:1300,z:1}; //10.000 is some arbitrary amount
  scrollSpeed: Vector = {x:800,y:800,z:800}; //pixels/sec
  edge: Vector = {x:75,y:85,z:80};
  moveTo: Vector = {x:0,y:0,z:0};
  moveToStep: Vector = {x:150,y:150,z:150};
  focusOnUnit: Entity | null = null;
  focusOnEntityOnScroll: Entity | null = null;
  scale: number = 1;

  setDimensions(viewPortSize: Vector, scale: number){
    this.scale = scale;
    for( const [k, v] of Object.entries(viewPortSize) ) {
      const key = k as keyof Vector;
      const size = v as number;
      this.dimensions[key] = size/scale;
      this.maxPos[key] -= size/scale;
      this.edge[key] *= scale;
      this.moveToStep[key] = ((this.dimensions.x/2));
      this.scrollSpeed[key] /= scale;
      //console.log("SCALE: "+scale);
    }
  }

  setMapSize(mapSize: Vector){
    this.maxPos.x = (mapSize.x - this.dimensions.x);
    this.maxPos.y = (mapSize.y - this.dimensions.y);
    this.maxPos.z = (mapSize.z - this.dimensions.z);
  }

  getAbsolutePosOfVector(vector: Vector):Vector{
    let absPos: Vector = new Vector();
    absPos.x = vector.x + this.curPos.x;
    absPos.y = vector.y + this.curPos.y;
    absPos.z = vector.z + this.curPos.z;
    return absPos;
  }

  getRelativePosOfVector(vector: Vector):Vector{
    let relativePos = new Vector();
    for( const [k, v] of Object.entries(vector) ){
      const key = k as keyof Vector;
      const val = v as number;
      relativePos[key] = val - this.curPos[key];
    }
    return relativePos;
  }

  entityIsInFrame(entity: Entity | MapEntity):boolean {
    let entityPos;
    let entitySize : Vector;
    if (entity instanceof Entity) {
      entityPos = entity.movement.curPos as Vector;
      entitySize = entity.size as Vector;
    } else {
      entityPos = entity.tile.pos as Vector;
      entitySize = entity.tile.size as Vector;
    }
    for( const [k, v] of Object.entries(entityPos) ){
      const key = k as keyof Vector;
      const val = v as number;
      if(
        ((val + entitySize[key]) < this.curPos[key]) ||
        (val > (this.curPos[key] + this.dimensions[key]))
      ){
        return false;
      }
    }
    return true;
  }


  processEntityEdgeScroll(entity: Entity){
    if(!this.entityIsInFrame(entity) || this.focusOnUnit){
      return
    }
    if(entity.movement.curPos.x > (this.curPos.x + this.dimensions.x - this.edge.x - entity.size.x)) {
      if (this.focusOnEntityOnScroll) {
        this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.x = this.curPos.x + this.moveToStep.x;
      }
      if(this.moveTo.x > this.maxPos.x){
        this.moveTo.x = this.maxPos.x;
      }
    }
    if(entity.movement.curPos.y > (this.curPos.y + this.dimensions.y - this.edge.y - entity.size.y)){
      if (this.focusOnEntityOnScroll) {
        this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.y = this.curPos.y + this.moveToStep.y;
      }
      if(this.moveTo.y > this.maxPos.y){
        this.moveTo.y = this.maxPos.y;
      }
    }
    if(entity.movement.curPos.z > (this.curPos.z + this.dimensions.z - this.edge.z - entity.size.z)){
      if (this.focusOnEntityOnScroll) {
        //this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.z = this.curPos.z + this.moveToStep.z;
      }
      if(this.moveTo.z > this.maxPos.z){
        this.moveTo.z = this.maxPos.z;
      }
    }
    if(entity.movement.curPos.x < this.curPos.x + this.edge.x){
      if (this.focusOnEntityOnScroll) {
        this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.x = this.curPos.x - this.moveToStep.x;
      }
      if(this.moveTo.x < this.minPos.x){
        this.moveTo.x = this.minPos.x;
      }
    }
    if(entity.movement.curPos.y < this.curPos.y + this.edge.y){
      if (this.focusOnEntityOnScroll) {
        this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.y = this.curPos.y - this.moveToStep.y;
      }
      if(this.moveTo.y < this.minPos.y){
        this.moveTo.y = this.minPos.y;
      }
    }
    if(entity.movement.curPos.z < this.curPos.z + this.edge.z){
      if (this.focusOnEntityOnScroll) {
        //this.centerOnEntity(this.focusOnEntityOnScroll);
      } else {
        this.moveTo.z = this.curPos.z - this.moveToStep.z;
      }
      if(this.moveTo.z < this.minPos.z){
        this.moveTo.z = this.minPos.z;
      }
    }
    //console.log(entity.movement.curPos);
  }

  centerOnEntity(entity: Entity){
    this.moveTo.x = entity.movement.curPos.x - (this.dimensions.x / 2);
    this.moveTo.y = entity.movement.curPos.y - (this.dimensions.y / 2);
    this.moveTo.z = entity.movement.curPos.z - (this.dimensions.z / 2);
  }

  move(framerate: number = 60){
    if(this.focusOnUnit) {

      for (const [k, v] of Object.entries(this.moveTo)) {
        const key = k as keyof Vector;

        this.curPos[key] = this.focusOnUnit.movement.curPos[key] - (this.dimensions[key]/2);
        if (this.curPos[key] > this.maxPos[key]) {
          this.curPos[key] = this.maxPos[key];
        }
        if (this.curPos[key] < this.minPos[key]) {
          this.curPos[key] = this.minPos[key];
        }
      }
      return
    }
    for( const [k, v] of Object.entries(this.moveTo) ){
      const key = k as keyof Vector;
      const moveCoord = v as number;
      if(moveCoord > this.curPos[key]){
        this.curPos[key] += (this.scrollSpeed[key] / framerate);
        if(this.curPos[key] > this.maxPos[key]){
          this.curPos[key] = this.maxPos[key];
        }
      }
      if(moveCoord < this.curPos[key]){
        this.curPos[key] -= (this.scrollSpeed[key] / framerate);
        if(this.curPos[key] < this.minPos[key]){
          this.curPos[key] = this.minPos[key];
        }
      }
    }
  }





}


