import Payroll from './Payroll';

export class PayrollCommission extends Payroll {
  protected _value: CommissionConstructor;
  constructor(constructor: CommissionConstructor) {
    super(constructor);
  }
  public calc(): Money {
    const total = this._value.total.getValue() * this._value.percent;
    return new Money(total);
  }
}

export default PayrollCommission;
