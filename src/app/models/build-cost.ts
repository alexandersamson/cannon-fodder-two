import {Money} from "./commodities/money";

export class BuildCost {
  money: Money;

  constructor(money:number) {
    this.money = new Money();
    this.money.amount = money;
  }

}
