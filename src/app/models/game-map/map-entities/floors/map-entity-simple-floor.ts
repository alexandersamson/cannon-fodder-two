import {MapEntity} from "../map-entity";
import {Vector} from "../../../movement/vector";
import {MovementZones} from "../../../armor-classes/movement-zones";

export class MapEntitySimpleFloor extends MapEntity{
  constructor(pos: Vector, size: Vector) {
    super(pos,size);
    this.allowedMovementZonesDefault = [
      MovementZones.LAND,
      MovementZones.AIR
    ]
    this.indestructible = true;
  }
}
