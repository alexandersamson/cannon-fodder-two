import {MapEntity} from "../map-entity";
import {Vector} from "../../../movement/vector";
import {MovementZones} from "../../../armor-classes/movement-zones";

export class MapEntitySimpleWall extends MapEntity{
  constructor(pos: Vector, size: Vector) {
    super(pos, size);
    this.indestructible = true;
    this.allowedMovementZonesDefault = [
      MovementZones.WALL_GROUND
    ]
  }
}
