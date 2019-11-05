import Payroll from './Payroll';
import Money from '../type/Money';

export class PayrollWage extends Payroll {
  protected _value: WageConstructor;
  constructor(constructor: WageConstructor) {
    super(constructor);
    this.calc();
  }
  public calc(): void {
    const [baseHours, OTHours] = this.calcHours();
    this._payment = this.calcTotal(baseHours, OTHours);
  }
  private calcHours(): [number, number] {
    let standardHours: number = 0;
    let OTHours: number = 0;
    for (let i = 0; i < this._value.hoursEachWeek.length; i++) {
      const tHours: number = this._value.hoursEachWeek[i];
      if (tHours > 40) {
        OTHours += tHours - 40;
      }
      standardHours += tHours;
    }
    let BaseHours: number = standardHours - OTHours;
    return [BaseHours, OTHours];
  }
  private calcTotal(base: number, OT: number): Money {
    const hourlyWage: number = this._value.hourly.getValue();
    const baseWage: Money = new Money(base * hourlyWage);
    const OTWage: Money = new Money(OT * hourlyWage * 1.5);
    const totalWage: Money = baseWage.add(OTWage);
    return totalWage;
  }
}

export default PayrollCommission;
