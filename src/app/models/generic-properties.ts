import {Icon} from "./styling/icon";
import {Color} from "./effects/color";

export class GenericProperties {
  name: string;
  shortName: string | undefined;
  realisticName: string;
  title: string;
  prefix: string;
  postfix: string;
  type: string;
  descriptionBuy: string;
  description: string;
  styles: Array<string>;
  iconNormal: Icon;
  iconPassive: Icon;
  iconActive: Icon;
  iconShowStackAmount: boolean;
  color: Color;
  constructor() {
    this.name = '';
    this.shortName = undefined;
    this.realisticName = '';
    this.title = '';
    this.prefix = '';
    this.postfix = '';
    this.type = '';
    this.descriptionBuy = '';
    this.description = '';
    this.styles = [];
    this.iconNormal = new Icon();
    this.iconPassive = new Icon();
    this.iconActive = new Icon();
    this.iconShowStackAmount = false;
    this.color = new Color()
  }
}
