import {GameMap} from "../gameMap";
import {Vector} from "../../movement/vector";
import {GameContainer} from "../../gameplay/game-container";
import {SpawnPlayerSurvivor} from "../../spawners/spawn-player-survivor";
import {SpawnHostileGuardLevel1} from "../../spawners/spawn-hostile-guard-level-1";
import {Mp5} from "../../weapons/smgs/mp5";
import {InventorySlot} from "../../inventory/inventory-slot";
import {Bullet9mmHv} from "../../ammo/bullet9mm-hv";
import {EwcSmall} from "../../ammo/ewc-small";
import {InvLootChest} from "../../inventory/loot-chests/inv-loot-chest";
import {PhotonRifleMk1} from "../../weapons/energy-rifles/photon-rifle-mk1";
import {Pistol9mm} from "../../weapons/pistols/pistol9mm";
import {InvWeaponMagazine} from "../../inventory/inv-weapon-magazine";
import {Bullet9mm} from "../../ammo/bullet-9mm";
import {ItemArmorEnergyShieldSmall} from "../../items/armor/item-armor-energy-shield-small";
import {BoltActionRifle556} from "../../weapons/rifles/bolt-action-rifle-556";
import {Bullet556} from "../../ammo/bullet-556";
import {M4A1} from "../../weapons/rifles/m4a1";
import {Bullet50calAe} from "../../ammo/bullet-50cal-ae";
import {DesertEagle50cal} from "../../weapons/pistols/desert-eagle-50cal";
import {BoltActionRifle762} from "../../weapons/rifles/bolt-action-rifle-762";
import {Bullet762} from "../../ammo/bullet-762";
import {RocketMissilePml} from "../../ammo/rocket-missile-pml";
import {PersonalMissileLauncher} from "../../weapons/rocket-launchers/personal-missile-launcher";


export class MapLevel1 extends GameMap {
  constructor(container: GameContainer) {
    let tileSize = 50; //How big is a map tile?
    let dimensions = new Vector(40, 26); //Dimension (in tiles) of this map. 40x40 = standard size.
    let mapPopulationString //The layout of the map.
      = "[wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][wh][wh][wh][wh][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][wh][wh][fc][fc][wh][wh][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][wh][wh][wh][wh][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][fc][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][fc][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][wh][wh][fg][fg][wh][wh][wh][wh][fg][fg][wh][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][wh][wh][wh][wh][wh][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fs][fs][fs][fs][fs][fs][fs][fs][wh][fc][fc][fc][fc][fc][fc][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][wh][wh][wh][wh][fg][fg][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][wh][wh][wh][wh][wh][fg][fg][wh][wh][wh][wh][wh][wh][wh][fg][fg][wh][wh]" +
        "[wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][wh][wh][fg][fg][wh][wh][wh][wh][wh][fg][fg][wh][wh][wh][wh][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][fg][wh][fg][fg][fg][fg][fg][wh]" +
        "[wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh][wh]"

    super(container, dimensions, mapPopulationString, tileSize);
    this.spawnEntities(container)
  }

  spawnEntities(container: GameContainer){
    //Create player unit
    let playerUnit = new SpawnPlayerSurvivor(container,new Vector(650,100)).unit;
    playerUnit.realisticName = container.services.randomNameService.getRandomSurname('generic');
    container.player.selectEntity(playerUnit);

    //Create the rest
    let enemy1 = new SpawnHostileGuardLevel1(container,new Vector(525,325)).unit;
    enemy1.movement.repeatWaypoints = true;
    enemy1.movement.addWaypoint(new Vector(775,325));
    enemy1.movement.addWaypoint(new Vector(775,475));
    enemy1.movement.addWaypoint(new Vector(525,475));
    enemy1.movement.addWaypoint(new Vector(525,325));
    let enemy2 = new SpawnHostileGuardLevel1(container,new Vector(475,465)).unit;
    enemy2.movement.repeatWaypoints = true;
    enemy2.movement.addWaypoint(new Vector(475,535));
    enemy2.movement.addWaypoint(new Vector(475,465));
    enemy2.weapons[0] = new Mp5();
    enemy2.weapons[0].reload(container,enemy2);
    enemy2.lootDropChests[0].inventoryItems.push(new InventorySlot(new Mp5()));
    enemy2.lootDropChests[0].inventoryItems.push(new InventorySlot(new Bullet9mmHv(60)));
    let enemy3 = new SpawnHostileGuardLevel1(container,new Vector(1500,1000)).unit;
    let enemy4 = new SpawnHostileGuardLevel1(container,new Vector(1100,1000)).unit;
    let enemy5 = new SpawnHostileGuardLevel1(container,new Vector(700,300)).unit;
    let enemy6 = new SpawnHostileGuardLevel1(container,new Vector(600,400)).unit;
    let enemy7 = new SpawnHostileGuardLevel1(container,new Vector(500,500)).unit;
    let enemy8 = new SpawnHostileGuardLevel1(container,new Vector(1300,400)).unit;
    let enemy9 = new SpawnHostileGuardLevel1(container,new Vector(1500,600)).unit;
    let enemy10 = new SpawnHostileGuardLevel1(container,new Vector(1400,900)).unit;

    //Make a chest with a pistol and some bullets

    let pml = new PersonalMissileLauncher();
    if(pml.durability) {
      pml.durability.amountCurrent = pml.durability.amountMax / 3.9
    }
    pml.magazine = new InvWeaponMagazine();
    pml.magazine.assignToWeapon(pml, 4);
    pml.magazine.insertItemStack(new RocketMissilePml(4))
    let pmlSlot = new InventorySlot(pml);


    let bolt762 = new BoltActionRifle762();
    if(bolt762.durability) {
      bolt762.durability.amountCurrent = bolt762.durability.amountMax / 3.9
    }
    bolt762.magazine = new InvWeaponMagazine();
    bolt762.magazine.assignToWeapon(bolt762, 30);
    bolt762.magazine.insertItemStack(new Bullet762(30))
    let bolt762Slot = new InventorySlot(bolt762);


    let deagle = new DesertEagle50cal();
    if(deagle.durability) {
      deagle.durability.amountCurrent = deagle.durability.amountMax / 3.9
    }
    deagle.magazine = new InvWeaponMagazine();
    deagle.magazine.assignToWeapon(deagle, 70);
    deagle.magazine.insertItemStack(new Bullet50calAe(70))
    let deagleSlot = new InventorySlot(deagle);

    let m4 = new M4A1();
    if(m4.durability) {
      m4.durability.amountCurrent = m4.durability.amountMax / 5.1
    }
    m4.magazine = new InvWeaponMagazine();
    m4.magazine.assignToWeapon(m4, 60);
    m4.magazine.insertItemStack(new Bullet556(60))
    let m4Slot = new InventorySlot(m4);

    let bolt = new BoltActionRifle556();
    if(bolt.durability) {
      bolt.durability.amountCurrent = bolt.durability.amountMax / 2.8
    }
    bolt.magazine = new InvWeaponMagazine();
    bolt.magazine.assignToWeapon(bolt, 30);
    bolt.magazine.insertItemStack(new Bullet556(60))
    let boltSlot = new InventorySlot(bolt);
    let pistol1 = new Pistol9mm();
    if(pistol1.durability) {
      pistol1.durability.amountCurrent = pistol1.durability.amountMax / 3.2
    }
    pistol1.magazine = new InvWeaponMagazine();
    pistol1.magazine.assignToWeapon(pistol1, 20);
    pistol1.magazine.insertItemStack(new Bullet9mm(20))
    let slot1 = new InventorySlot(pistol1)
    let slot2 = new InventorySlot( new ItemArmorEnergyShieldSmall())
    let chest1 = new InvLootChest(container, 1, [pmlSlot, bolt762Slot, deagleSlot, m4Slot,boltSlot, slot1, slot2, new InventorySlot(new Bullet9mm(20)), new InventorySlot(new RocketMissilePml(12)), new InventorySlot(new Bullet556(120))])
    chest1.movement.curPos = new Vector(525, 100);
    container.lootChests.push(chest1);

    //Make a chest with ammo
    let slot3 = new InventorySlot(new EwcSmall(7))
    let chest2 = new InvLootChest(container, 1, [slot3])
    chest2.movement.curPos = new Vector(1500, 1100);
    container.lootChests.push(chest2);

    //Make a chest with a gun
    let slot4 = new InventorySlot(new PhotonRifleMk1())
    let chest3 = new InvLootChest(container, 1, [slot4])
    chest3.movement.curPos = new Vector(950, 650);
    container.lootChests.push(chest3);

  }
}
