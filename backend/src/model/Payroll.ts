import {
  Body,
  WageConstructor,
  SalaryConstructor,
  CommissionConstructor,
  SearchQuery,
  Constructor,
  Value
} from '../interface/Payroll.interface';
import { Money } from '../type/Money';
import { ServerError, ClientError } from '../type/Error';
import { Schedule, ScheduleManager } from '../model/Schedule';
import User from '../model/User';
import Payment from '../type/Payment';

export class Payroll {
  private _value: Value;
  constructor(payroll: Constructor) {
    const users: User[] = User.search({ id: payroll.userID });
    const schedules: Schedule[] = Schedule.search();
    this._value = {
      ...payroll,
      user: users[0],
      schedule: schedules[0],
      tracked: [1, 1, 1, 1]
    };
  }
  public getUserID(): string {
    return this._value.user.getID();
  }
  public getUser(): User {
    return this._value.user;
  }
  public pay(): boolean {
    // Use Paypal API to pay employee
    return false;
  }
  public convertToWage(): PayrollWage {}
  public convertToSalary() {}
  public static search(query: Partial<SearchQuery>): Payroll[] {}
}

export default Payroll;
