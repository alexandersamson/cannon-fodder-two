import {ParseClick} from "./parse-click";
import {MouseMovement} from "./mouse-movement";
import {ParseKeyboard} from "./parse-keyboard";

export class UserInputHandler {
  clickParser: ParseClick = new ParseClick();
  mouseMovementHandler: MouseMovement = new MouseMovement();
  parseKeyboard: ParseKeyboard = new ParseKeyboard();
}
