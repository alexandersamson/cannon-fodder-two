import {Unit} from "../unit";
import {FactionHumanSurvivorsAlpha} from "../../factions/faction-human-survivors-alpha";
import {HumanBiologicUnarmored} from "../../armor-classes/human-biologic-unarmored";
import {SpriteUnitMenSurvivor} from "../../sprites/units/men/sprite-unit-men-survivor";
import {GameContainer} from "../../gameplay/game-container";

export class Survivor extends Unit{

  constructor(container: GameContainer) {

    let sprite = new SpriteUnitMenSurvivor(container);

    super(sprite);

    this.type = 'Human Biological';
    this.name = "Survivor";
    this.title = "Survivor";
    this.realisticName = '';
    this.descriptionBuy = "A survivor.";
    this.description = "A survivor."
    this.lifeProperties.armorClass = new HumanBiologicUnarmored();
    this.faction = new FactionHumanSurvivorsAlpha();
    this.initHp(100);

    //COSMETICS
    this.relativeCastingPoint.x = 12;
    this.relativeCastingPoint.y = 12;
    this.relativeCastingPointAngle = 0.33;
  }



}
