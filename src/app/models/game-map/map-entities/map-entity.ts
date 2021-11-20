import {MovementZone} from "../../armor-classes/movement-zone";
import {Item} from "../../items/item";
import {ArmorClass} from "../../armor-classes/armor-class";
import {SpriteMapEntity} from "../../sprites/map-entities/sprite-map-entity";
import {Rectangle} from "../../geometry/rectangle";
import {Vector2d} from "../../geometry/vector-2d";

export class MapEntity {
  sprites: Array<SpriteMapEntity> = []; //To draw a floor AND a wall on it for example
  allowedMovementZonesDefault: Array<MovementZone> = [];

  //Door
  isDoor: boolean = false;
  isOpen: boolean = false;
  allowedMovementZonesOnOpen: Array<MovementZone> = [];
  allowedKeys: Array<Item> = [];

  //Phsysics
  tile: Rectangle;
  indestructible: boolean = true;
  hp: number = 100;
  armorClass: ArmorClass | undefined = undefined
  replaceWithOnDestroy: MapEntity | undefined = undefined;
  dropItemsOnDestroy: Array<Item> = [];
  destroyAlsoOnDestroy: Array<MapEntity> = [];

  constructor(pos: Vector2d, tileSize: Vector2d = new Vector2d(50,50)) {
    this.tile = new Rectangle(pos, tileSize)
  }
}
