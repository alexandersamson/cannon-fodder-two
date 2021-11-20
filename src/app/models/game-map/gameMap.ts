import {Vector} from "../movement/vector";
import {GenericPropertiesLean} from "../generic-properties-lean";
import {MapEntity} from "./map-entities/map-entity";
import {MapEntitySimpleWallHorizontal} from "./map-entities/walls/map-entity-simple-wall-horizontal";
import {Settings} from "../app/settings";
import {MapEntitySimpleFloorGrass} from "./map-entities/floors/map-entity-simple-floor-grass";
import {GameContainer} from "../gameplay/game-container";
import {Vector2d} from "../geometry/vector-2d";
import {mapEntitySimpleFloorCheckerboard} from "./map-entities/floors/map-entity-simple-floor-checkerboard";
import {mapEntitySimpleFloorStreet} from "./map-entities/floors/map-entity-simple-floor-street";

export class GameMap extends GenericPropertiesLean {
  mapSize: Vector2d;
  populationArray: Array<MapEntity>;
  tileSize: number;
  colissionMap: Array<any>;

  constructor(container: GameContainer, mapSize: Vector, mapPopulationString: string, tileSize: number) {
    super();
    this.name = "Map";
    this.description = "A game map to play,";
    this.mapSize = mapSize;
    this.tileSize = tileSize;
    this.colissionMap = [[]];
    this.populationArray = this.populateMap(container, mapPopulationString, mapSize);
    this.setViewport(container);
  }

  getColissionMapValue(position:number){
    console.log(Math.floor(position/this.mapSize.x), Math.floor(position%this.mapSize.x))
    return this.colissionMap[Math.floor(position/this.mapSize.x)][Math.floor(position%this.mapSize.x)]
  }


  populateMap(container: GameContainer, populationString: string, mapSize: Vector2d = this.mapSize): Array<MapEntity>{
    console.log("Loading map data...");
    let parseSize = Settings.mapParseStringSize;
    let totalTiles = mapSize.x * mapSize.y;
    let pupulationArray: Array<MapEntity> = []

    if(Math.round(totalTiles * parseSize ) !== populationString.length){
      console.log("Mapdata cannot be parsed: inconsistent dimensions with provided map data.");
      return [];
    }

    let iteratorY = 0;
    let iteratorX = 0;
    this.colissionMap = new Array(mapSize.y);
    for(let i = 0; i < this.colissionMap.length; i++){
      this.colissionMap[i] = new Array(this.mapSize.x);
    }
    for(let i = 0; i < totalTiles; i++){
      const subStr = populationString.substring(i*parseSize,(i*parseSize)+parseSize)
      //console.log(i);

      let pos = new Vector(
        iteratorX*this.tileSize,
        iteratorY*this.tileSize
      )

      //simple wall - horizontal
      if(subStr === '[wh]') {
        pupulationArray[i] = new MapEntitySimpleWallHorizontal(container, pos, new Vector(this.tileSize, this.tileSize));
      }
      //simple floor - grass
      else if(subStr === '[fg]') {
        pupulationArray[i] = new MapEntitySimpleFloorGrass(container, pos, new Vector(this.tileSize, this.tileSize));
      }
      //simple floor - checkerboard
      else if(subStr === '[fc]') {
        pupulationArray[i] = new mapEntitySimpleFloorCheckerboard(container, pos, new Vector(this.tileSize, this.tileSize));
      }
      //simple floor - street
      else if(subStr === '[fs]') {
        pupulationArray[i] = new mapEntitySimpleFloorStreet(container, pos, new Vector(this.tileSize, this.tileSize));
      }
      else {
        pupulationArray[i] = new MapEntitySimpleFloorGrass(container, pos, new Vector(this.tileSize, this.tileSize));
      }
      let val = 0
      pupulationArray[i].allowedMovementZonesDefault.forEach(zone => {
        val += zone.zone.value
      })
      this.colissionMap[iteratorY][iteratorX] = val;
      iteratorX++;
      if(iteratorX >= mapSize.x){
        iteratorX = 0;
        iteratorY += 1;
      }
    }
    console.log(this.colissionMap);
    let flagLAND = 1;
    let flagAIR =  2;
    let flagWATER =  4;
    let flagSPACE = 8;
    let bird = flagLAND | flagAIR | flagWATER;
    let frog = flagLAND | flagWATER;
    let alien = flagSPACE;
    console.log('bird', this.getColissionMapValue(0), bird, bird & this.getColissionMapValue(0))
    console.log('frog', this.getColissionMapValue(0), frog, frog & this.getColissionMapValue(0))
    console.log('alien', this.getColissionMapValue(0), alien, alien & this.getColissionMapValue(0))

    console.log('bird', this.getColissionMapValue(41), bird, bird & this.getColissionMapValue(41))
    console.log('frog', this.getColissionMapValue(41), frog, frog & this.getColissionMapValue(41))
    console.log('alien', this.getColissionMapValue(41), alien, alien & this.getColissionMapValue(41))
    //console.log(pupulationArray);
    console.log("Loading map data done! Loaded "+totalTiles+" tiles.")
    return pupulationArray;
  }


  setViewport(container: GameContainer){
    container.viewPort.setMapSize(new Vector(this.mapSize.x * this.tileSize, this.mapSize.y * this.tileSize, 1));
  }

  //When this method returns true. This map has been won.
  //This method can be written over by the game map
  checkWinConditions(container:GameContainer){
    return false
  }

  //When this method returns true. This map has been lost.
  //This method can be written over by the game map
  checkLoseConditions(container:GameContainer){
    if(container.player.selectedEntity && !container.player.selectedEntity.lifeProperties.isAlive){
      return true; //lose
    }
    return false
  }

}
