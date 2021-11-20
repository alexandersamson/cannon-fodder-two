import {MapEntitySimpleFloor} from "./map-entity-simple-floor";
import {Vector} from "../../../movement/vector";
import {GameContainer} from "../../../gameplay/game-container";
import {spriteMapEntitySimpleFloorCheckerboardTiles} from "../../../sprites/map-entities/floors/sprite-map-entity-simple-floor-checkerboard-tiles";
import {spriteMapEntitySimpleFloorStreet} from "../../../sprites/map-entities/floors/sprite-map-entity-simple-floor-street";

export class mapEntitySimpleFloorStreet extends MapEntitySimpleFloor{
  constructor(container: GameContainer, pos: Vector, size: Vector) {
    super(pos, size);
    this.sprites[0] = new spriteMapEntitySimpleFloorStreet(container)
  }
}
