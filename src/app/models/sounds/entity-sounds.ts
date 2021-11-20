export class EntitySounds {
  //GENERIC
  playOnSpawn: Array<string> = [];
  playOnDeath: Array<string> = [];
  playOnTakingDamage: Array<string> = [];

  //TOOLS
  playOnUse: Array<string> = [];
  playOnLoad: Array<string> = [];
  playOnEmpty: Array<string> = [];

  //UNITS
  playOnMoveOrder: Array<string> = [];
  playOnAttackOrder: Array<string> = [];
  playOnStopOrder: Array<string> = [];
  playOnInteraction: Array<string> =[];
}
