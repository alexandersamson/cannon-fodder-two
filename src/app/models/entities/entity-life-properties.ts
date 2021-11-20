import {ArmorClass} from "../armor-classes/armor-class";
import {Entity} from "./entity";

export class EntityLifeProperties {
  hp: number = 100;
  sp: number = 0;
  hpMax: number = 100;
  private _hpMaxBase: number = 100;
  spMax: number = 0;
  private _spMaxBase: number = 0;
  hpReviveFactor = 1;
  spReviveFactor = 1;
  hpRegenerateRate: number = 0;
  private _hpRegenerateRateBase: number = 0;
  spRegenerateRate: number = 0;
  private _spRegenerateRateBase: number = 0;
  regeneratesWhileDead: boolean = false;
  baseArmor: number = 1;
  armorClass: ArmorClass = new ArmorClass();
  isAlive: boolean = true;
  isUndead: boolean = false;
  turnToUndeadOnDeath = false;
  invulnerable: boolean = false //This entity cannot be killed due to in-game damage
  isEnabled: boolean = true; //When disabled, usually there needs to be a doctor/repair facility
  expirationTimerValueMax = 0; //millisecs
  expirationTimerValue = 0;
  forceShowHealthBars: boolean = false; //Only units show health bars. Items don't. When required for items, this needs to be set to true.

  constructor() {
  }

  public get hpMaxBase(){
    return this._hpMaxBase;
  }
  public set hpMaxBase(amount: number){
    this._hpMaxBase = Math.max(Math.min(amount, Number.MAX_SAFE_INTEGER), 0)
  }

  public get spMaxBase(){
    return this._spMaxBase;
  }
  public set spMaxBase(amount: number){
    this._spMaxBase = Math.max(Math.min(amount, Number.MAX_SAFE_INTEGER), 0)
  }

  public get hpRegenerateRateBase(){
    return this._hpRegenerateRateBase;
  }
  public set hpRegenerateRateBase(amount: number){
    this._hpRegenerateRateBase = Math.max(Math.min(amount, Number.MAX_SAFE_INTEGER), 0)
  }

  public get spRegenerateRateBase(){
    return this._spRegenerateRateBase;
  }
  public set spRegenerateRateBase(amount: number){
    this._spRegenerateRateBase = Math.max(Math.min(amount, Number.MAX_SAFE_INTEGER), 0)
  }


  kill(entity: Entity){
    if(this.invulnerable) {
      return;
    }
    entity.lifeProperties.isAlive = false;
    if(this.turnToUndeadOnDeath){
      this.makeUndead(entity);
    } else {
      entity.lifeProperties.hp = 0;
      entity.lifeProperties.sp = 0;
    }
  }


  //ENABLE/DISABLE
  disable(entity: Entity){
    entity.lifeProperties.isEnabled = false;
  }
  enable(entity: Entity){
    entity.lifeProperties.isEnabled = true;
  }


  //UNDEAD/Living
  makeUndead(entity: Entity){
    this.isUndead = true;
    this.isAlive = true;
    this.reviveHp(entity);
    this.reviveSp(entity);
  }
  makeLiving(entity: Entity){
    this.isUndead = false;
    this.isAlive = true;
    this.reviveHp(entity);
    this.reviveSp(entity);
  }


  //REVIVAL
  revive(entity: Entity){
    entity.lifeProperties.isAlive = true;
    this.reviveHp(entity);
    this.reviveSp(entity);
  }
  reviveHp(entity: Entity){
    entity.lifeProperties.hp = entity.lifeProperties.hpMax * entity.lifeProperties.hpReviveFactor;
  }
  reviveSp(entity: Entity){
    entity.lifeProperties.sp = entity.lifeProperties.spMax * entity.lifeProperties.spReviveFactor;
  }

}

