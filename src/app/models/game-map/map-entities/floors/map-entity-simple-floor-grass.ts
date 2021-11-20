import {SpriteMapEntitySimpleFloorGrass} from "../../../sprites/map-entities/floors/sprite-map-entity-simple-floor-grass";
import {MapEntitySimpleFloor} from "./map-entity-simple-floor";
import {Vector} from "../../../movement/vector";
import {GameContainer} from "../../../gameplay/game-container";

export class MapEntitySimpleFloorGrass extends MapEntitySimpleFloor{
  constructor(container: GameContainer, pos: Vector, size: Vector) {
    super(pos, size);
    this.sprites[0] = new SpriteMapEntitySimpleFloorGrass(container)
  }
}
