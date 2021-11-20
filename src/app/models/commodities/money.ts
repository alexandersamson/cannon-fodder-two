export class Money {
  amount: number;
  name: string;
  description: string;
  icon: string;
  constructor() {
    this.amount = 0;
    this.name = 'Money';
    this.description = 'Money is used to buy nearly anything.';
    this.icon = 'paid';
  }

  pay(payAmount:number): boolean{
    if(this.amount >= payAmount){
      this.amount -= payAmount;
      return true;
    }
    return false;
  }

  canPayAmount(costPerPiece: number){
    const pieces = Math.floor(this.amount / costPerPiece);
    return pieces > 0 ? pieces : 0 ;
  }

  add(incomeAmount:number){
    this.amount += incomeAmount
  }

  set(setAmount: number){
    this.amount = setAmount;
  }
}
