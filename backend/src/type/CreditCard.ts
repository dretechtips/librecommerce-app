export class CreditCard {
  private _number: number;
  private _cvv: number;
  private _exp: Date;
  constructor(number: number, cvv: number, exp: Date) {
    this._number = number;
    this._cvv = cvv;
    this._exp = exp;
  }
  private verify() {}
}

export default CreditCard;
