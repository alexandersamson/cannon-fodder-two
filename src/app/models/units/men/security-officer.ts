import {Unit} from "../unit";
import {HumanBiologicArmored} from "../../armor-classes/human-biologic-armored";
import {FactionHumanSurvivorsBeta} from "../../factions/faction-human-survivors-beta";
import {SpriteUnitMen} from "../../sprites/units/men/sprite-unit-men";
import {SpriteUnitMenSecurityOfficer} from "../../sprites/units/men/sprite-unit-men-security-officer";
import {GameContainer} from "../../gameplay/game-container";
import {SpriteUnitMenSurvivor} from "../../sprites/units/men/sprite-unit-men-survivor";

export class SecurityOfficer extends Unit{
  constructor(container: GameContainer) {

    let sprite = new SpriteUnitMenSecurityOfficer(container);

    super(sprite);

    this.type = 'Security';
    this.name = "Security Officer";
    this.title = "Basic security officer";
    this.realisticName = '';
    this.descriptionBuy = "Hire a basic security officer for your protection. Comes with a 9mm pistol.";
    this.description = "A basic security officer."
    this.buildTime = 12000;
    this.lifeProperties.armorClass = new HumanBiologicArmored();
    this.faction = new FactionHumanSurvivorsBeta();
    this.initHp(100);
    this.movement.speedMax = {x:1,y:1,z:1};
    this.movement.speedMin = {x:0.1,y:0.1,z:0.1};

    //COSMETICS
    this.relativeCastingPoint.x = 12;
    this.relativeCastingPoint.y = 12;
    this.relativeCastingPointAngle = 0.33;
  }
}
