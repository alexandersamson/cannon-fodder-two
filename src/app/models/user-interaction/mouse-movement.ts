import {Vector2d} from "../geometry/vector-2d";
import {GameContainer} from "../gameplay/game-container";
import {Entity} from "../entities/entity";
import {Vector} from "../movement/vector";
import {Unit} from "../units/unit";

export class MouseMovement {
  constructor() {
  }

  handleMovement(container: GameContainer, pos: Vector2d){
    container.lastMousePos = {...pos};
    if(container.player.selectedEntity && container.player.selectedEntity.canOperate(container.player.selectedEntity)){
      let unit = container.player.selectedEntity as Unit;
      this.rotateEntityToCursorPos(container, unit, pos);
    }
  }

  rotateEntityToCursorPos(container: GameContainer, entity: Entity, pos: Vector2d){
    let absolutePos = container.viewPort.getAbsolutePosOfVector(pos as Vector);
    entity.movement.faceToTarget(absolutePos)
  }

}
