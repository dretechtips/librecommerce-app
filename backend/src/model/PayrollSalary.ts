import Payroll from './Payroll';

export class PayrollSalary extends Payroll {
  protected _value: SalaryConstructor;
  constructor(constructor: SalaryConstructor) {
    super(constructor);
  }
  public calc(): Money {}
}

export default PayrollSalary;
