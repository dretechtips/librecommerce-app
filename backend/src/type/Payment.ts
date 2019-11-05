import Money from './Money';
import { Value, Constructor, Breakdown } from '../interface/Payment.interface';

export class Payment {
  private _value: Value;
  constructor(payment: Constructor) {
    this._value = {
      ...payment
    };
  }
  public add(money: number | Money, name?: string): void {
    money = typeof money === 'number' ? new Money(money) : money;
    this._value.breakdown.push({ name, cost: money });
  }
  public removeIf(callback: (breakdown: Breakdown, index: number) => boolean) {
    this._value.breakdown.filter(callback);
  }
  private log(): void {}
  public pay(): void {}
}

export default Payment;
