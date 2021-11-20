import {GenericPropertiesLean} from "../generic-properties-lean";

export class MovementZone extends GenericPropertiesLean{
  public zone: {value: number, name: string, description: string};
  constructor(value:number, name:string = '', desecription:string='') {
    super();
    this.zone = {value: value, name: name, description: desecription}
  }
}
