import {EntityLifeProperties} from "./entity-life-properties";
import {Durability} from "./durability";
import {GenericProperties} from "../generic-properties";
import {BuildCost} from "../build-cost";
import {Faction} from "../factions/faction";
import {FactionNotAssigned} from "../factions/faction-not-assigned";
import {Movement} from "../movement/movement";
import {EffectLine} from "../effects/effect-line";
import {GameContainer} from "../gameplay/game-container";
import {Effect} from "../effects/effect";
import {EffectPoint} from "../effects/effect-point";
import {Vector} from "../movement/vector";
import {EntitySounds} from "../sounds/entity-sounds";
import {ArmorClass} from "../armor-classes/armor-class";
import {Settings} from "../app/settings";
import {Color} from "../effects/color";
import {Sprite} from "../sprites/sprite";
import {Unit} from "../units/unit";
import {SpriteVariant} from "../sprites/sprite-variant";
import {InvLootChest} from "../inventory/loot-chests/inv-loot-chest";
import {IBuffPropertyValueNumber} from "../buffs/IBuff-property-value-number";

export class Entity extends GenericProperties{
  //GENERIC PROPERTIES

  //LIFE & DURABILITY
  lifeProperties: EntityLifeProperties = new EntityLifeProperties();
  durability: Durability | null = null;

  //FACTION & IDENTITTY
  faction: Faction = new FactionNotAssigned();

  //PHYSICAL PROPERTIES & MOVEMENT
  weight: number = 1;
  size: Vector = {x:10, y:10, z: 10};
  origin: Vector = new Vector(0,0,0); //What's the center of the unit?
  radius: number = 10; //TODO: Make proper sizing property/object
  movement: Movement = new Movement();
  isAttacking: boolean = false;
  target: Entity | undefined = undefined;
  isDummy: boolean = false;
  isUnderAttack: boolean = false;
  relativeCastingPoint: Vector = new Vector();
  relativeCastingPointAngle: number = 0;
  relativeDamagePoint: Vector = new Vector();
  relativeDamagePointAngle: number = 0;

  //INTERACTION & LOOTING
  interactionRange: number = 50;
  lootDropChests: InvLootChest[] = [];

  //ARMOR CLASS
  armorClass: ArmorClass = new ArmorClass();

  //BUFFS
  buffs: Array<IBuffPropertyValueNumber> = [];

  //RARITY / RANDOM
  rarityLevel:number = 1;

  //XP
  level:number = 1;
  levelMax: number = 10;
  xp: number = 0;
  xpMax: number = 100;
  xpValueOnKill: number = 1;

  //COSTS
  cost: BuildCost = new BuildCost(0);
  costUpkeep: BuildCost = new BuildCost(0);
  canSell: boolean = false;
  sellCostFactor: number = 0.75;

  //CONSTRUCTION
  buildTime: number = 1;

  //SPRITE
  sprite: Sprite | undefined;

  //FX
  fxDefault: Array<Effect> = [];
  fxSpawn: Array<Effect> = [];
  fxDie: Array<Effect> = [];
  fxAwake: Array<Effect> = [];
  fxAttackOrigin: Array<Effect> = [];
  fxAttackTarget: Array<Effect> = [];
  fxAttackChannel: Array<EffectLine> = [];
  fxAttacked: Array<Effect> = [];

  //SOUNDS
  sounds = new EntitySounds();


  //CONSTRUCTOR
  constructor(sprite: Sprite | undefined = undefined, isDummy:boolean = false) {
    super();
    this.isDummy = isDummy
    this.sprite = sprite;
    this.centerOrigin(this.sprite)// Most entities have a centered origin. So center it, so that the draw method functions properly
  }


  select(container: GameContainer){
    container.player.selectedEntity = this;
  }

  //METHODS
  getRotation(){
    return this.movement.rot;
  }

  //Most units and items needs their origin set to the center, so the placement of them occurs correctly
  centerOrigin(sprite: Sprite | undefined){
    //First check if there's a sprite attached with a frame in the idle position
    if(this.sprite && this.sprite.spritesheet && this.sprite.spritesheet.title && this.sprite.spriteVariants.idle){
      let variantIdle = this.sprite.spriteVariants.idle;
      if(variantIdle.frames[variantIdle.currentFrame]){
        let scale = variantIdle.frames[variantIdle.currentFrame].scale;
        let frameSize = variantIdle.frames[variantIdle.currentFrame].size;
        this.origin.x = (frameSize.x/2)*scale;
        this.origin.y = (frameSize.y/2)*scale;
        this.origin.z = (frameSize.z/2)*scale;
        return;
      }
    }
    //if not, then use entity's size
    this.origin.x = this.size.x/2;
    this.origin.y = this.size.y/2;
    this.origin.z = this.size.z/2;
  }

  getOrigin(){
    return this.origin;
  }


  getPosition(){
    return new Vector(
      this.movement.curPos.x - this.origin.x,
      this.movement.curPos.y - this.origin.y,
      this.movement.curPos.y - this.origin.z
    )
  }

  //Get the point of which weapons are fired, and tools are being used.
  getCastingPoint(entity: Entity = this){
    let castingPoint = new Vector();
    castingPoint.x = entity.movement.curPos.x + (Math.cos(entity.getRotation()+this.relativeCastingPointAngle) * entity.relativeCastingPoint.x);
    castingPoint.y = entity.movement.curPos.y + (Math.sin(entity.getRotation()+this.relativeCastingPointAngle) * entity.relativeCastingPoint.y);
    return castingPoint;
  }

  initHp(amount:number, regenRate: number = 0){
    amount >= 0 ? this.lifeProperties.hp = amount : this.lifeProperties.hp = 0;
    this.lifeProperties.hpMax = this.lifeProperties.hp;
    this.lifeProperties.hpMaxBase = this.lifeProperties.hp;
    regenRate >= 0 ? this.lifeProperties.hpRegenerateRate = regenRate : this.lifeProperties.hpRegenerateRate = 0;
    this.lifeProperties.hpRegenerateRateBase = regenRate;
  }

  initSp(amount:number, regenRate: number = 0){
    amount >= 0 ? this.lifeProperties.sp = amount : this.lifeProperties.sp = 0;
    this.lifeProperties.spMax = this.lifeProperties.sp;
    this.lifeProperties.spMaxBase = this.lifeProperties.sp;
    regenRate >= 0 ? this.lifeProperties.spRegenerateRate = regenRate : this.lifeProperties.spRegenerateRate = 0;
    this.lifeProperties.spRegenerateRateBase = regenRate;
  }

  //Needs to be run by the gameLoop process
  processBuffs(container: GameContainer){
    //1. First reset the max values to their base max values
    this.setMaxPropertyValuesToBaseValues();

    //2. Then check own entity buffs
    if(this.buffs.length > 0){
      this.buffs.forEach(buff => {
        buff.setBuffedPropertyValue(container.framerate, this)
      })
    }

    //3. Then check for item buffs. This is one wild nested beast.
    let unit = this as unknown as Unit;
    if(unit.inventories && unit.inventories.length > 0){
      unit.inventories.forEach(inventory => {
        if(!inventory.inventoryItems || inventory.inventoryItems.length < 1 || inventory.getItemSlotsAmount() < 1){
          return;
        }
        inventory.inventoryItems.forEach(itemSlot => {
          if(itemSlot.item.passiveAbilities && itemSlot.item.passiveAbilities.length > 0){
            itemSlot.item.passiveAbilities.forEach(passiveAbility => {
              passiveAbility.enforceBuffs(container, unit);
            })
          }
        })
      })
    }
  }

  setMaxPropertyValuesToBaseValues(){
    this.lifeProperties.hpMax = this.lifeProperties.hpMaxBase;
    this.lifeProperties.spMax = this.lifeProperties.spMaxBase;
    this.lifeProperties.hpRegenerateRate = this.lifeProperties.hpRegenerateRateBase;
    this.lifeProperties.spRegenerateRate = this.lifeProperties.spRegenerateRateBase;
  }

  //Called by the game loop
  selfHeal(framerate: number){
    if(framerate <= 0){
      framerate = 0.001;
    }
    if(this.lifeProperties.hpRegenerateRate> 0){
      let fractionHp = (1000/framerate)/1000 * this.lifeProperties.hpRegenerateRate;
      this.addHp(fractionHp);
    }
    if(this.lifeProperties.spRegenerateRate> 0) {
      let fractionSp = (1000 / framerate) / 1000 * this.lifeProperties.spRegenerateRate;
      this.addSp(fractionSp);
    }
  }

  addHp(amount: number){
    this.lifeProperties.hp += amount;
    if(this.lifeProperties.hp < 0){
      this.lifeProperties.hp = 0;
    } else if(this.lifeProperties.hp > this.lifeProperties.hpMax){
      this.lifeProperties.hp = this.lifeProperties.hpMax;
    }
  }

  addSp(amount: number){
    this.lifeProperties.sp += amount;
    if(this.lifeProperties.sp <= 0){
      this.lifeProperties.sp = 0;
    } else if(this.lifeProperties.sp > this.lifeProperties.spMax){
      this.lifeProperties.sp = this.lifeProperties.spMax;
    }
  }

  canOperate(entity: Entity = this):boolean{
    if(!entity.lifeProperties.isEnabled || !entity.lifeProperties.isAlive){
      return false;
    }
    return true;
  }

  moveTo(position: Vector){
    if(!this.canOperate(this)){
      return;
    }
    this.movement.moveTo(position);
  }

  move(bypass: boolean = false){
    if(!this.canOperate(this)){
      return;
    }
    this.movement.updateMove(bypass);
  }

  stopMoving(){
    this.movement.stop();
  }

  takeDamage(container: GameContainer, source: Entity, target: Entity, damageAmount:number) {
    if (!target.lifeProperties || target.lifeProperties.invulnerable) {
      return;
    }
    target.lifeProperties.sp -= damageAmount;
    if (target.lifeProperties.sp < 0) { //when negative
      target.lifeProperties.hp += target.lifeProperties.sp; // 'add' the negative amount to life, in effect subtracting it
      target.lifeProperties.sp = 0;
    }
    if (target.lifeProperties.hp <= 0) {
      target.lifeProperties.hp = 0;
      this.lifeProperties.kill(target);
      source.grantXp(target.xpValueOnKill); // Grant XP to the killing unit
    }
    let unit = target as Unit
    if (unit.usesAi && unit.usesAi.length > 0) {
      unit.usesAi.forEach(ai => {
        ai.onTakingDamage(container, unit, source)
      })
    }
  }

  //This method is mostly called after a unit or some kind of destructible dies and probably won't resurrect immediately. Drop chests and such are called.
  destroy(container: GameContainer){
    if(this.lifeProperties.isAlive){
      this.lifeProperties.isAlive = false;
    }
    if(this.lootDropChests.length > 0){
      this.lootDropChests.forEach(chest => {
        chest.movement.curPos = {...this.movement.curPos}
        chest.removesWhenEmpty = true; // These chests need to go after empty
        container.lootChests.push(chest);
      })
    }
  }

  levelUp(adjustment: number = 1) {
    if(((this.level+adjustment) <= this.levelMax) && ((this.level+adjustment) > 1)){
      this.level += adjustment
    }
  }

  calculateNewXpMax(xpMaxCurrent: number, levelCurrent: number){
    return xpMaxCurrent + (xpMaxCurrent * levelCurrent)
  }


  grantXp(xpAdd: number){
    if(xpAdd === 0){
      return;
    }
    if(xpAdd > 0 && this.xp >= this.xpMax && this.level >= this.levelMax){
      return;
    }
    if(xpAdd < 0 && this.xp <= 0 && this.level <= 1){
      return;
    }
    if(xpAdd > 0) {
      while (((xpAdd + this.xp) >= this.xpMax) && (this.level < this.levelMax)) {
        xpAdd -= this.xpMax - this.xp;                                //1. subtract the remainder needed to level
        this.levelUp();                                               //2. level up the entity
        this.xpMax = this.calculateNewXpMax(this.xpMax, this.level);  //3. Calculate and set a new XP Max value
        this.xp = 0;
      }
      if ((xpAdd + this.xp) >= this.xpMax) {                              //4. If already max level, but still too much
        this.xp = this.xpMax                                          //5. Just set level to max
      } else {
        this.xp += xpAdd                                              //6. In any other case, add the amount to xp
      }
    } else {
      while (((xpAdd + this.xp) <= 0) && (this.level > 1)) {
        xpAdd += this.xp;                                //1. subtract the remainder needed to level
        this.levelUp(-1);                                               //2. level up the entity
        this.xpMax = this.calculateNewXpMax(this.xpMax, this.level);  //3. Calculate and set a new XP Max value
        this.xp = this.xpMax-1;
      }
      if ((xpAdd + this.xp) <= 0) {                              //4. If already max level, but still too much
        this.xp = 0;                                          //5. Just set level to max
      } else {
        this.xp += xpAdd                                              //6. In any other case, add the amount to xp
      }
    }
  }


  pushLineEffect<E extends EffectLine,S extends Entity,T extends Entity>(container: GameContainer, effect: E, source: S, target: T, vectorSource:Vector|null = null, vectorTarget:Vector|null = null){
    if(vectorSource){
      effect.startPos = {...vectorSource};
    } else {
      effect.startPos = {...this.getCastingPoint(source)};
      effect.startPos = effect.getScatterVector(effect.startPos, effect.scatterAtStart, effect.missedTarget, effect.criticalHit);
    }
    if(vectorTarget){
      effect.endPos = {...vectorTarget};
    } else {
      effect.endPos = {...target.movement.curPos};
      effect.endPos = effect.getScatterVector(effect.endPos, effect.scatterAtEnd, effect.missedTarget, effect.criticalHit);
    }
    effect.missedTarget = false;
    effect.criticalHit = false;

    const newFx = Object.create(effect);
    Object.assign(newFx, effect);
    container.effects.push(Object.create(newFx));

    effect.coCallLineEffects.forEach(lineEffect => {
      this.pushLineEffect(container, lineEffect, source, target, effect.startPos, effect.endPos); // custom vectors to override random scatter and such.
    })
    effect.targetEffects.forEach(pointEffect => {
      this.pushPointEffect(container, pointEffect, effect.endPos);
    })
    effect.sourceEffects.forEach(sourceEffect => {
      this.pushPointEffect(container, sourceEffect, effect.startPos);
    })
  }

  pushPointEffect<E extends EffectPoint,S extends Entity,T extends Entity | Vector>(container: GameContainer, effect: E, target: T) {
    if (target instanceof Entity) {
      effect.startPos = {...target.movement.curPos};
    } else {
      effect.startPos = target;
    }
    const newFx = Object.create(effect);
    Object.assign(newFx, effect);
    container.effects.push(newFx);
  }

  //DRAW
  prepareToDrawEntitySprite(container: GameContainer, ctx: CanvasRenderingContext2D, spriteVariant: SpriteVariant | undefined){
    if(!this.sprite || !this.sprite.spritesheet || !this.sprite.spritesheet.title){
      //console.log('No sprite');
      return;
    }
    if (!container.viewPort.entityIsInFrame(this)){
      //console.log('out of frame!');
      return;
    }

    let spriteVariation = spriteVariant ?? this.sprite.spriteVariants.idle;

    this.sprite.draw(
      ctx,
      container.viewPort.getRelativePosOfVector(this.movement.curPos),
      this.getRotation(),
      this.getOrigin(),
      spriteVariation,
      this.sprite.spritesheet
    );
  }

  getDistanceToEntity(entity1: Entity, entity2: Entity){
    return Math.sqrt(((entity2.movement.curPos.x-entity1.movement.curPos.x)**2) + ((entity2.movement.curPos.y-entity1.movement.curPos.y)**2))
    //Faster than Math.hypot. And since we are not working with absurdly high numbers, this is okay.
  }

  drawPlayerTarget(container: GameContainer, ctx: CanvasRenderingContext2D){
    if(container.player.selectedEntity && container.player.selectedEntity.target && this === container.player.selectedEntity.target){
      let relativePos: Vector = container.viewPort.getRelativePosOfVector(this.movement.curPos);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.strokeStyle = Settings.targetIndicatorColor.getCssColorString();
      ctx.arc(relativePos.x, relativePos.y, this.radius*1.7, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  drawEntityPeripherals(container: GameContainer, c: CanvasRenderingContext2D){
    let relativePos: Vector = container.viewPort.getRelativePosOfVector(this.movement.curPos);
    c.lineWidth = 2.5;
    c.beginPath();
    c.strokeStyle = this.color.getCssColorString();
    c.arc(relativePos.x, relativePos.y, this.radius*2.15, 0, 2 * Math.PI);
    c.stroke();
    if(container.player.selectedEntity && (this.getDistanceToEntity(this, container.player.selectedEntity) > Settings.maxDrawingDistanceUnitPeripherals)){
      return
    }
    if(!container.player.selectedEntity){
      return;
    }
    let distance = this.getDistanceToEntity(this, container.player.selectedEntity);
    let colorHpBar = new Color(48,208,48,192);
    let colorSpBar = new Color(92,92,236,212);
    let colorBgHealthBar = new Color(0,0,0,128);
    if(distance > Settings.minDrawingDistanceUnitPeripherals){
      let minD = Settings.minDrawingDistanceUnitPeripherals;
      let maxD = Settings.maxDrawingDistanceUnitPeripherals;
      let fraction = 1-((distance-minD) / (maxD-minD));
      colorHpBar.t *= fraction;
      colorSpBar.t *= fraction;
      colorBgHealthBar.t *= fraction;
    }
    if(this.lifeProperties.hp && this.lifeProperties.hp > 0){
      c.beginPath();
      c.lineWidth = 6;
      c.strokeStyle = colorBgHealthBar.getCssColorString();
      c.arc(relativePos.x, relativePos.y, this.radius*2.4, (0.5*Math.PI), (2.5 * Math.PI)) ;
      c.stroke();
      c.beginPath();
      c.lineWidth = 3;
      c.strokeStyle = colorHpBar.getCssColorString();
      c.arc(relativePos.x, relativePos.y, this.radius*2.4, (0.5*Math.PI), ((2 * Math.PI)*this.lifeProperties.hp/this.lifeProperties.hpMax)+(0.5*Math.PI)) ;
      c.stroke();
    }
    if(this.lifeProperties.sp && this.lifeProperties.sp > 0){
      c.beginPath();
      c.lineWidth = 2;
      c.strokeStyle = colorSpBar.getCssColorString();
      c.arc(relativePos.x, relativePos.y, this.radius*2.5, (0.5*Math.PI), ((2 * Math.PI)*this.lifeProperties.sp/this.lifeProperties.spMax)+(0.5*Math.PI)) ;
      c.stroke();
    }
  }

  drawTextAbove(
    container: GameContainer,
    ctx: CanvasRenderingContext2D,
    text:string,
    size:number = 11,
    fgColor:Color = new Color(255,255,255,255),
    bgColor:Color = new Color(48,48,48,200),
    adjustHeightPosition:number | undefined = undefined,
    lifetime: number | undefined = undefined)
  {
    if(text.length < 1){
      return
    }

    //check if size is within bounds 6-96 pixels. 6- is unreadable, 96+ can cause problems
    size > 96 ? size = 96 : size < 6 ? size = 6 : size;

    let colorStringFg: string = fgColor.getCssColorString();
    let colorStringBg: string = bgColor.getCssColorString();

    //prepare the drawing
    ctx.beginPath();
    ctx.textBaseline = "top";
    ctx.font = size + 'px Arial';
    let textWidthInPx = ctx.measureText(text);
    let margin = 2;
    let standOffY = 7; // How far on top of the entity should the bottom of this text appear?

    //get the position for the background rectangle
    let relativePos: Vector = container.viewPort.getRelativePosOfVector(this.movement.curPos);
    let x = relativePos.x - (textWidthInPx.width/2)-margin
    let y = relativePos.y - size - standOffY - (margin*2);
    let w = textWidthInPx.width + (margin*2);
    let h = size + (margin*2);

    //Adjust the heigth
    if(adjustHeightPosition && adjustHeightPosition > 0){
      y -= (h+1) * adjustHeightPosition;
    }

    //Draw the background rectangle
    ctx.fillStyle = colorStringBg;
    ctx.fillRect(x,y,w,h);

    //Draw the textstring
    ctx.fillStyle = colorStringFg;
    ctx.fillText(text, x+margin,y+margin);
    ctx.closePath();
  }

}
