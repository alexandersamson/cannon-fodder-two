import {Icon} from "./styling/icon";

export class GenericPropertiesLean {
  name: string;
  shortName: string | undefined;
  title: string;
  prefix: string;
  postfix: string;
  description: string;
  styles: Array<string>;
  iconNormal: Icon;
  constructor() {
    this.name = '';
    this.shortName = undefined;
    this.title = '';
    this.prefix = '';
    this.postfix = '';
    this.description = '';
    this.styles = [];
    this.iconNormal = new Icon();
  }
}
