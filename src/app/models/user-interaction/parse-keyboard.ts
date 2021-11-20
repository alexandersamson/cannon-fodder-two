import {GameContainer} from "../gameplay/game-container";
import {Unit} from "../units/unit";

export class ParseKeyboard {

  w: boolean = false;
  a: boolean = false;
  s: boolean = false;
  d: boolean = false;
  r: boolean = false;
  esc: boolean = false;

  constructor() {
  }

  //move forward
  handleW(container: GameContainer, pressed: boolean) {
    this.w = pressed;
  }
  handleA(container: GameContainer, pressed: boolean) {
    this.a = pressed;
  }
  handleS(container: GameContainer, pressed: boolean) {
    this.s = pressed;
  }
  handleD(container: GameContainer, pressed: boolean) {
    this.d = pressed;
  }
  handleR(container: GameContainer, pressed: boolean) {
    this.r = pressed;
  }
  handleESC(container: GameContainer, pressed: boolean) {
    this.esc = pressed;
  }

  handleKeysPressed(container: GameContainer){
    if(this.w || this.a || this.s || this.d){
      if(container.player.selectedEntity && container.player.selectedEntity.canOperate()){
        container.player.selectedEntity.movement.moveByKeyboard(this.w, this.a, this.s, this.d);
      }
    } else {
      if(container.player.selectedEntity && container.player.selectedEntity.canOperate()){
        container.player.selectedEntity.movement.stop();
      }
    }

    if(this.r){
      if(container.player.selectedEntity && container.player.selectedEntity.canOperate()){
        let unit = container.player.selectedEntity as Unit;
        if(unit.weapons && unit.weapons.length && unit.weapons[0].ammoPerUse > 0){
          unit.weapons[0].reload(container,unit)
        }
      }
    }
  }
}
