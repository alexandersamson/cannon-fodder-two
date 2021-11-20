import {Component, HostListener, OnInit} from '@angular/core';
import {CanvasService} from "../../services/canvas.service";
import {GameCanvasProperties} from "../../models/game-canvas/game-canvas-properties";
import {take} from "rxjs/operators";
import {SurnamesService} from "../../services/surnames.service";
import {GameContainer} from "../../models/gameplay/game-container";
import {EffectLine} from "../../models/effects/effect-line";
import {EffectPoint} from "../../models/effects/effect-point";
import {Vector} from "../../models/movement/vector";
import {Ammo} from "../../models/ammo/ammo";
import {InvWeaponMagazine} from "../../models/inventory/inv-weapon-magazine";
import {Unit} from "../../models/units/unit";
import {Item} from "../../models/items/item";
import {Weapon} from "../../models/weapons/weapon";
import {Color} from "../../models/effects/color";
import {Player} from "../../models/player/player";
import * as EasyStar from "easystarjs"
import {EffectProjectile} from "../../models/effects/effect-projectile";
import {Vector2d} from "../../models/geometry/vector-2d";

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})



export class GameCanvasComponent implements OnInit {

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: any) {
    this.updateCanvasProperties()
  }


  debug: boolean = true;
  canvasProperties: GameCanvasProperties = new GameCanvasProperties();
  initScale: number = 0;
  canvas: HTMLCanvasElement | null | undefined;
  context: CanvasRenderingContext2D | null | undefined;
  requestFrame: number | null = null;
  gameContainer: GameContainer = new GameContainer(); //SINGLETON Class
  lastTimestamp: number = 0;
  frameRate: number = 0;
  levelCouter: number = 0;
  preload: any[] = [];
  preloaded: boolean = false;
  playedFirstSound = false;
  easystar = new EasyStar.js()

  //mouseevents
  mouseDown: boolean = false;
  leftClickPos: Vector2d[] = [{x:0,y:0}];
  rightClickPos: Vector2d[] = [{x:0,y:0}];
  mouseMovePos: Vector2d[] = [{x:0,y:0}];

  //keyboardEvents
  wPressed: boolean = false;
  aPressed: boolean = false;
  sPressed: boolean = false;
  dPressed: boolean = false;
  rPressed: boolean = false;
  escPressed: boolean = false;

  //playerProperties
  selectedEntity = this.gameContainer.player.selectedEntity;
  selectedWeapon = this.gameContainer.player.selectedWeapon;
  selectedMag = this.gameContainer.player.selectedMag;
  selectedAmmo = this.gameContainer.player.selectedAmmo;


  constructor(private canvasService: CanvasService, private randomNameService: SurnamesService) {
    this.updateCanvasProperties();
    this.preloadObjects();
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.canvas = document.querySelector(this.canvasProperties.getId()) as HTMLCanvasElement;
    this.context = this.canvas?.getContext("2d") as CanvasRenderingContext2D;
    this.clearCanvas();
    this.initGame(this.context as unknown as CanvasRenderingContext2D);
    window.addEventListener('keydown', (event) => {
      switch(event.code) {
        case "KeyS":
        case "ArrowDown":
          this.sPressed = true;
          break;
        case "KeyW":
        case "ArrowUp":
          this.wPressed = true;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.aPressed = true;
          break;
        case "KeyD":
        case "ArrowRight":
          this.dPressed = true;
          break;
        case "KeyR":
          this.rPressed = true;
          break;
        case "Escape":
          this.escPressed = true;
          break;
      }
    });
    window.addEventListener('keyup', (event) => {
      switch(event.code) {
        case "KeyS":
        case "ArrowDown":
          this.sPressed = false;
          break;
        case "KeyW":
        case "ArrowUp":
          this.wPressed = false;
          break;
        case "KeyA":
        case "ArrowLeft":
          this.aPressed = false;
          break;
        case "KeyD":
        case "ArrowRight":
          this.dPressed = false;
          break;
        case "KeyR":
          this.rPressed = false;
          break;
        case "Escape":
          this.escPressed = false;
          break;
      }
    });
    this.canvas?.addEventListener('mousemove', (event) => {
      if(this.mouseMovePos.length < 5) {
        this.mouseMovePos.push({x: event.offsetX, y: event.offsetY})
      }
    });
    this.canvas?.addEventListener('mousedown', (event) => {
      this.mouseDown = true;
    });
    this.canvas?.addEventListener('mouseup', (event) => {
      this.mouseDown = false;
      this.gameContainer.userInputHandler.clickParser.isAttackingGround = false;
    });
    this.canvas?.addEventListener('click', (event) => {
      if(!this.playedFirstSound){
        this.gameContainer.sounds.preloadedAudio[0].play();
        this.playedFirstSound = true;
      } else {
        if (this.leftClickPos.length < 5) {
          this.leftClickPos.push({x: event.offsetX, y: event.offsetY})
        }
      }
    })
    this.canvas?.addEventListener('contextmenu', (event) => {
      if(this.rightClickPos.length < 5) {
        event.preventDefault();
        this.rightClickPos.push({x: event.offsetX, y: event.offsetY})
      }
    })
    this.gameLoop(this.canvas as unknown as HTMLCanvasElement, this.context as unknown as CanvasRenderingContext2D);
  }

  updateCanvasProperties(){
    this.canvasProperties = new GameCanvasProperties();
    this.canvasProperties.setHeight(window.innerHeight);
    this.canvasService.updateCanvasProperties(this.canvasProperties);
  }

  preloadObjects(){
    const subscription = this.canvasService.currentCanvasProperties.pipe(take(1)).subscribe( res =>{
      this.canvasProperties = res;
      let scale = this.canvasProperties.getScale();
      this.initScale = scale;
      this.gameContainer.viewPort.setDimensions({x:this.canvasProperties.getWidth(),y:this.canvasProperties.getHeight(),z:0}, scale);
      this.preload = [
        this.gameContainer.preloadAudio(),
        this.gameContainer.preloadSprites(),
        this.gameContainer.loadMap(),
      ];
      this.preloaded = true;
    });
  }

  resetGame(level: number){
    this.gameContainer = new GameContainer();
    this.gameContainer.player = new Player();
    this.gameContainer.player.selectedEntity = undefined;
    this.gameContainer.player.selectedWeapon = undefined;
    this.gameContainer.player.selectedAmmo = undefined;
    this.gameContainer.player.selectedMag = undefined;
    this.gameContainer.gameMap = undefined;
    this.gameContainer.lootChests.splice(0,this.gameContainer.lootChests.length);
    this.gameContainer.units.splice(0,this.gameContainer.units.length);
    this.gameContainer.items.splice(0,this.gameContainer.items.length);
    this.gameContainer.effects.splice(0,this.gameContainer.effects.length);
    this.preloaded = false;
    this.preloadObjects();
    this.gameContainer.framerate = 0;
    this.clearCanvas();
    this.initGame(this.context as unknown as CanvasRenderingContext2D);
  }

  clearCanvas(){
    if(this.canvas) {
      this.context?.clearRect(0, 0, this.canvas?.width, this.canvas?.height)
    }
  }

  initGame(ctx: CanvasRenderingContext2D) {
    //Check if game is preloaded, before continuation
    if (!this.preloaded){
      let self = this;
      setTimeout(function () {
        self.initGame(ctx);
      }, 200);
    }

    let scale = this.canvasProperties.getScale();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);

    //uncomment this in order to lock the center of the viewport on the unit
    this.gameContainer.viewPort.focusOnUnit = this.gameContainer.player.selectedEntity as Unit;
    this.gameContainer.viewPort.focusOnEntityOnScroll = this.gameContainer.player.selectedEntity as Unit;
    console.log(this.gameContainer);
  }

  processMouseMove(){
    if(!this.mouseMovePos.length){
      return;
    }
    let relMovePos = new Vector2d(this.mouseMovePos[0].x / this.canvasProperties.getScale(), this.mouseMovePos[0].y / this.canvasProperties.getScale())
    this.gameContainer.userInputHandler.mouseMovementHandler.handleMovement(this.gameContainer, relMovePos)
    this.mouseMovePos = [];
  }

  processClick(){
    if(!this.leftClickPos.length){
      return;
    }
    this.gameContainer.userInputHandler.clickParser.clickRouter(this.gameContainer, {
      x: this.leftClickPos[0].x  / this.canvasProperties.getScale(), y: this.leftClickPos[0].y / this.canvasProperties.getScale(), z: 0
    },this.gameContainer.player.selectedEntity , false, false);
    this.leftClickPos = [];
  }


  processClickDown(){
    if(!this.mouseDown){
      return
    }

    this.gameContainer.userInputHandler.clickParser.clickRouter(
      this.gameContainer,
      this.gameContainer.lastMousePos as Vector,
      this.gameContainer.player.selectedEntity ,
      false,
      true);
  }

  procesKeyboardEvents(){
      this.gameContainer.userInputHandler.parseKeyboard.handleW(this.gameContainer, this.wPressed);
      this.gameContainer.userInputHandler.parseKeyboard.handleA(this.gameContainer, this.aPressed);
      this.gameContainer.userInputHandler.parseKeyboard.handleS(this.gameContainer, this.sPressed);
      this.gameContainer.userInputHandler.parseKeyboard.handleD(this.gameContainer, this.dPressed);
      this.gameContainer.userInputHandler.parseKeyboard.handleR(this.gameContainer, this.rPressed);
      this.gameContainer.userInputHandler.parseKeyboard.handleESC(this.gameContainer, this.wPressed);
    this.gameContainer.userInputHandler.parseKeyboard.handleKeysPressed(this.gameContainer);

  }

  processRightClick(){
    if(!this.rightClickPos.length){
      return;
    }
    this.rightClickPos = [];
  }


  gameLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, timestamp: number = 0){
    if(!this.preloaded || !this.playedFirstSound){
      window.requestAnimationFrame((timestamp) => {
        this.gameLoop(canvas, ctx, timestamp)
      });
      return;
    }
    this.frameRate = 1000/(timestamp - this.lastTimestamp);
    this.lastTimestamp = timestamp;
    this.gameContainer.framerate = this.frameRate;
    let scale = this.canvasProperties.getScale();
    ctx.clearRect(0, 0, canvas.width/this.canvasProperties.getScale(), canvas.height/this.canvasProperties.getScale());

    //RUN THE PROCESS
    this.processLoop(this.gameContainer, this.context as CanvasRenderingContext2D, this.frameRate);

    this.requestFrame = window.requestAnimationFrame((timestamp) => {
      this.gameLoop(canvas, ctx, timestamp)
    });
  }


  processLoop(container: GameContainer, ctx: CanvasRenderingContext2D, framerate: number){
    //CHECK WIN/LOSE
    if(container.gameMap?.checkLoseConditions(container)){
      console.log("Lost the game");
      window.cancelAnimationFrame(this.requestFrame as number);
      this.resetGame(1);
    }
    if(container.gameMap?.checkWinConditions(container)){
      console.log("Won the game");
    }

    //DRAW MAP
    if(container.gameMap) {
      this.processClick();
      this.processRightClick();
      this.processMouseMove();
      this.processClickDown();
      this.procesKeyboardEvents();
      let gameMap = container.gameMap;
      let tileCounter = 0;
      let drawCounter = 0;
      let tileSize = gameMap.tileSize;
      let populationArray = gameMap.populationArray;
      while (tileCounter < populationArray.length){
        if(!this.gameContainer.viewPort.entityIsInFrame(populationArray[tileCounter])){
          tileCounter++;
          continue;
        }
        let pos = this.gameContainer.viewPort.getRelativePosOfVector(populationArray[tileCounter].tile.pos as Vector);
        populationArray[tileCounter].sprites[0].draw(ctx, pos, 0, new Vector(0,0), populationArray[tileCounter].sprites[0].spriteVariants.idle)
        drawCounter++;
        tileCounter++;
      }
      //console.log(`Drawn ${drawCounter} of ${tileCounter} tiles!`);


      // for (let y = 0; y < gameMap.mapSize.y; y++) {
      //   for (let x = 0; x < gameMap.mapSize.x; x++) {
      //     let pos = {
      //       x: (x * tileSize) - container.viewPort.curPos.x,
      //       y: (y * tileSize) - container.viewPort.curPos.y,
      //       z: 0
      //     }
      //     populationArray[tileCounter].position
      //     populationArray[tileCounter].sprites[0].draw(ctx, pos, 0, populationArray[tileCounter].sprites[0].srcBasicSpritePositions.posIdle)
      //     tileCounter++
      //   }
      // }
    }

    //LOOT CHESTS etc.
    let removeChests: number[] = [];
    container.lootChests.forEach(function callback(lootChest, key){
      let relativePos: Vector = container.viewPort.getRelativePosOfVector(lootChest.movement.curPos);
      lootChest.prepareToDrawItemSprite(container, ctx);
      if(lootChest.lifeProperties.forceShowHealthBars){
        lootChest.drawEntityPeripherals(container, ctx);
      }
      if(lootChest.showContentsText && lootChest.movement.isInRangeOf(container.player.selectedEntity as Unit, container.player.selectedEntity?.interactionRange as number)) {
        let itemSlots = lootChest.getItemSlotsArray();
        if (itemSlots.length > 0) {
          let heightLevel = 0;
          itemSlots.forEach(itemSlot => {
            let text = itemSlot.item.name
            if (itemSlot.item.amount > 1) {
              text += " (" + itemSlot.item.amount + "x)";
            }
            lootChest.drawTextAbove(
              container,
              ctx,
              text,
              11,
              new Color(255,255,255,200),
              new Color(32,32,32,128),
              heightLevel
            );
            heightLevel++;
          })
        }
      }
      if(!lootChest.lifeProperties.isAlive || (lootChest.removesWhenEmpty && lootChest.getItemSlotsAmount() < 1)){
        removeChests.push(key)
      }
      lootChest.selfHeal(framerate);
    });

    //ENTITY UNITS
    let removeUnits: number[] = [];
    let self = this;
    container.units.forEach(function callback(entity, key){
      let relativePos: Vector = container.viewPort.getRelativePosOfVector(entity.movement.curPos);
      entity.runAi(container);//RUN AI SCRIPTS FOR UNITS
      entity.processBuffs(container);
      if(container.player.selectedEntity && entity != container.player.selectedEntity) {
        entity.move();
      } else if(container.player.selectedEntity) {
        //If player
        if(self.debug) {
          let mousePos = container.lastMousePos as Vector;
          let unitPos = container.viewPort.getRelativePosOfVector(container.player.selectedEntity.movement.curPos);
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = "#32FF3290";
          ctx.moveTo(unitPos.x, unitPos.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
          ctx.closePath();
        }
      }
      entity.drawPlayerTarget(container, ctx);
      if(entity.target){
        entity.attack(container, entity.target as Unit | Item)
      }
      entity.prepareToDrawUnitSprite(container, ctx);
      entity.drawEntityPeripherals(container, ctx);
      entity.weapons.forEach(weapon =>{
        weapon.cooldownReload(framerate);
        weapon.cooldown(framerate);
        weapon.drawRangeMarkers(container, entity, relativePos, ctx);
      });
      if(!entity.lifeProperties.isAlive){
        removeUnits.push(key)
      }
      entity.selfHeal(framerate);
    });


    //PROJECTILES
    for(let i = container.projectiles.length-1; i>=0; i--){
      let projectile = container.projectiles[i];
      //console.log(projectile);
      if(projectile && projectile.timerCurrent < 1){
          if(projectile.impactsOnTimeOut){
            projectile.impact(container, projectile.trajectory.start);
            projectile.impactsOnTimeOut = false;
          }
        container.projectiles.splice(i,1);
      } else if(projectile){
        projectile.move(container);
      }
    }


    //EFFECTS
    container.effects.forEach(effect =>{
      if(effect instanceof EffectLine || effect instanceof EffectPoint) {
        effect.draw(container.viewPort, ctx);
      }
      if(effect instanceof EffectProjectile){
        effect.draw(container.viewPort, ctx)
      }
      effect.processLifespan(container, framerate);
    })


    //MISC.
    this.processCollisionDetection(container);
    if(container.player.selectedEntity) {
      container.viewPort.processEntityEdgeScroll(container.player.selectedEntity);
    }
    container.viewPort.move();
    container.sounds.removeEndedSounds();
    removeUnits.forEach(index => {
      container.units[index].destroy(container);
      container.units.splice(index,1);
    })
    removeChests.forEach(index => {
      container.lootChests.splice(index,1);
    })

    //Player HUD vars
    this.selectedEntity = this.gameContainer.player.selectedEntity;
    let unit = this.selectedEntity as Unit;
    if(unit && unit.weapons && unit.weapons.length > 0) {
      container.player.selectedWeapon = unit.weapons[0] as Weapon;
      this.selectedWeapon = this.gameContainer.player.selectedWeapon;
      if(container.player.selectedWeapon.magazine) {
        container.player.selectedAmmo = unit.weapons[0].magazine.inventoryItems[0].item as Ammo;
        container.player.selectedMag = unit.weapons[0].magazine as InvWeaponMagazine;
        this.selectedMag = this.gameContainer.player.selectedMag;
        this.selectedAmmo = this.gameContainer.player.selectedAmmo;
      }
    }
  }


  //COLLISION DETECTION
  processCollisionDetection(container: GameContainer){
    container.units.forEach(unit => {
      if(container.collision.entityIsColliding(container, unit)){
        unit.movement.curPos = {...unit.movement.lastPos};
      }
    })
  }

}
