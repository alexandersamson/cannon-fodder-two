import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Commodity } from "../models/commodities/commodity";

@Injectable({
  providedIn: 'root'
})
export class CommodityService {

  private commodity = new BehaviorSubject(new Commodity());
  currentCommodity = this.commodity.asObservable();

  constructor() { }

  updateCommodity(commodity: Commodity) {
    this.commodity.next(commodity);
  }

}
