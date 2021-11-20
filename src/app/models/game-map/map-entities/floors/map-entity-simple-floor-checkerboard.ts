import {MapEntitySimpleFloor} from "./map-entity-simple-floor";
import {Vector} from "../../../movement/vector";
import {GameContainer} from "../../../gameplay/game-container";
import {spriteMapEntitySimpleFloorCheckerboardTiles} from "../../../sprites/map-entities/floors/sprite-map-entity-simple-floor-checkerboard-tiles";

export class mapEntitySimpleFloorCheckerboard extends MapEntitySimpleFloor{
  constructor(container: GameContainer, pos: Vector, size: Vector) {
    super(pos, size);
    this.sprites[0] = new spriteMapEntitySimpleFloorCheckerboardTiles(container)
  }
}
