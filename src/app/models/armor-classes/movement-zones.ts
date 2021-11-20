import {GenericPropertiesLean} from "../generic-properties-lean";
import {MovementZone} from "./movement-zone";

export class MovementZones extends GenericPropertiesLean{
  public static NONE = new MovementZone(0, "None", "Can travel nowhere");
  public static LAND = new MovementZone(1, "Land", "Can travel over land");
  public static AIR = new MovementZone(2, "Air", "Can travel in the air");
  public static WATER = new MovementZone(4, "Water", "Can travel on water");
  public static SPACE = new MovementZone(8, "Space", "Can travel in space");
  public static WINDOW = new MovementZone(16, "Window", "Can travel on or trough windows or other small openings");
  public static WALL_GROUND = new MovementZone(32, "Ground wall", "Can travel on or trough walls on the ground");
  public static WALL_AIR = new MovementZone(64, "Wall", "Can travel on or trough walls in air or space; is a ceiling perhaps.");
  public static ALL = new MovementZone(128, "All", "Can travel everywhere");
  public static zones = [
    MovementZones.NONE,
    MovementZones.LAND,
    MovementZones.AIR,
    MovementZones.WATER,
    MovementZones.SPACE,
    MovementZones.WINDOW,
    MovementZones.WALL_GROUND,
    MovementZones.WALL_AIR,
    MovementZones.ALL,
  ]
  constructor() {
    super();
  }
}
