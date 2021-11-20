import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Damage} from "../models/combat/damage";

@Injectable({
  providedIn: 'root'
})
export class DamageService {
  private damageTypes: Array<Damage> = [];

  private damageTypesObservable = new BehaviorSubject(this.damageTypes);
  currentDamageTypes = this.damageTypesObservable.asObservable();

  constructor() {
  }

  public updateDamageTypes(damageTypes: Array<Damage>) {
    this.damageTypesObservable.next(damageTypes);
  }


  public getDamageTypeByName(name: string):Damage{
   let damage = this.damageTypes.find(x =>{
     return x.name.toLowerCase() === name.toLowerCase()
   });
   return damage ?? new Damage();
  }

}
