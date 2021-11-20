import {Vector} from "../movement/vector";
import {Color} from "../effects/color";

export class Settings {
  static host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
  static assetsFolder = Settings.host+"/assets/";
  static spritesFolder = `${Settings.assetsFolder}images/spritesheets/`;
  static spritesExtension = '.png';
  static sprites = [
    'spritesheet-units-men',
    'spritesheet-default',
    'spritesheet-tiles',
    'treasurechests-32x32',
    'sprite-map-tileset'
  ]

  //AUDIO
  static soundsFolder = `${Settings.assetsFolder}audio/`;
  static sounds = [
    'weapons/bolt-action-reloading-1',
    'weapons/carbine-reloading-1',
    'weapons/energy-weapon-reloading-1',
    'weapons/photon-rifle-shooting-1',
    'weapons/pistol-reloading-1',
    'weapons/pistol-shooting-1',
    'weapons/pistol-shooting-2',
    'weapons/pistol-shooting-3',
    'weapons/rifle-556-shooting-1',
    'weapons/rifle-bolt-action-shooting-1',
    'weapons/rifle-reloading-1',
    'inventory/inventory-bag-open',
    'inventory/inventory-bag-close',
    'inventory/inventory-bag-insert',
  ];
  static soundsExtension = '.wav';
  static audioBufferSize = 7; // max simultaneous playing of the same audio file 6-10 is about okay

//MAPS
  static defaultMapDimensions = new Vector(40,40);
  static defaultTileSize = 50;
  static mapParseStringSize = 4;


  //DRAWING DISTANCESwd
  static maxDrawingDistanceUnitPeripherals = 400;
  static minDrawingDistanceUnitPeripherals = 250;


  //UI COSMETICS
  static targetIndicatorColor = new Color(255,32,32,168);
}



