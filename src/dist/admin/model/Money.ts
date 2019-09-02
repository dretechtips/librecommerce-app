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
}