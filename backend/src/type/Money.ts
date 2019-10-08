import { Discount } from "./Discount";

export class Money
{
  private _value: number;
  constructor(money: number)
  {
    this._value = parseInt(money.toFixed(2));
  }
  public getValue(): number
  {
    return this._value;
  }
  public toString(): string
  {
    return '$' + this._value;
  }
  public add(money: Money): Money
  {
    return new Money(this.getValue() + money.getValue());
  }
  public calcSalesTax(): Money
  {
    return new Money(this._value * 0.0725);
  }
  public addSalesTax(): Money
  {
    this._value += this._value * 0.0725;
    return this;
  }
  public reduce(discount: Discount): Money {
    return new Money(parseInt(discount.apply(this._value).toFixed(2)));
  }
}