import {Unit} from "../units/unit";
import {Item} from "../items/item";
import {Effect} from "../effects/effect";
import {SoundsContainer} from "../sounds/sounds-container";
import {GameViewport} from "../game-canvas/game-viewport";
import {Settings} from "../app/settings";
import {GameMap} from "../game-map/gameMap";
import {MapLevel1} from "../game-map/levels/map-level-1";
import {CollisionDetection} from "../movement/collision-detection";
import {Player} from "../player/player";
import {InvLootChest} from "../inventory/loot-chests/inv-loot-chest";
import {Entity} from "../entities/entity";
import {Inventory} from "../inventory/inventory";
import {UserInputHandler} from "../user-interaction/user-input-handler";
import {SurnamesService} from "../../services/surnames.service";
import {Projectile} from "../projectiles/projectile";
import {Vector2d} from "../geometry/vector-2d";

//The main container
export class GameContainer {
  framerate: number = 0;
  lastMousePos: Vector2d = new Vector2d(0,0);
  userInputHandler: UserInputHandler = new UserInputHandler();
  player: Player = new Player();
  units: Array<Unit> = [];
  items: Array<Item> = [];
  lootChests: Array<InvLootChest> = [];
  projectiles: Array<Projectile> = []; //TODO: make projectiles (colliders/projectiles)
  effects: Array<Effect> = [] //(non-colliders: cosmetic/damage/AoE)
  sounds: SoundsContainer = new SoundsContainer();
  viewPort: GameViewport = new GameViewport();
  sprites: Array<HTMLImageElement> = [];
  gameMap: GameMap | undefined;
  collision: CollisionDetection = new CollisionDetection();
  interactionWithEntity: Entity | undefined;
  interactionWithInventory: Inventory | undefined;
  services = {randomNameService: new SurnamesService()}

  getAllEntities():Entity[][]{
    return [this.units, this.items, this.lootChests];
  }

  preloadAudio(){
    console.log('Preloading sounds...');
    let preloadContainer = document.createElement("div");
    preloadContainer.style.display = "none";
    for(let i = 0; i < Settings.audioBufferSize; i++) {
      Settings.sounds.forEach(sound => {
        let src = `${Settings.soundsFolder}${sound}${Settings.soundsExtension}`;
        let audio = new Audio(src);
        audio.id = sound;
        if(audio.error){
          return;
        }
        preloadContainer.appendChild(audio);
        this.sounds.preloadedAudio.push(audio);
        console.log('Preloaded: ' + audio.src);
      })
    }
    console.log('Preloading sounds done!');
    return preloadContainer;
  }


  preloadSprites(){
    console.log('Preloading sprites...');
    let preloadContainer = document.createElement("div");
    preloadContainer.style.display = "none";
    Settings.sprites.forEach( sprite => {
      let image = new Image();
      image.src = `${Settings.spritesFolder}${sprite}${Settings.spritesExtension}`;
      image.title = sprite;
      preloadContainer.appendChild(image);
      this.sprites.push(image);
      console.log('Preloaded: '+image.src);
    })
    console.log('Preloading sprites done!');
    return preloadContainer;
  }


  loadMap(){
    this.gameMap = new MapLevel1(this);
    return true;
  }
}


