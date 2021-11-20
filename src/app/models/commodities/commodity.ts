import {Money} from "./money";

export class Commodity {
  money: Money;
  constructor(money: number = 0) {
    this.money = new Money();
    this.money.amount = money;
  }
}
