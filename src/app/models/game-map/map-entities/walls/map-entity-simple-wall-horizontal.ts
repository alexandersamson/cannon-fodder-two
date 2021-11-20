import {SpriteMapEntitySimpleWallHorizontal} from "../../../sprites/map-entities/walls/sprite-map-entity-simple-wall-horizontal";
import {MapEntitySimpleWall} from "./map-entity-simple-wall";
import {Vector} from "../../../movement/vector";
import {GameContainer} from "../../../gameplay/game-container";

export class MapEntitySimpleWallHorizontal extends MapEntitySimpleWall{
  constructor(container: GameContainer, pos: Vector, size: Vector) {
    super(pos, size);
    this.sprites[0] = new SpriteMapEntitySimpleWallHorizontal(container)
  }
}
