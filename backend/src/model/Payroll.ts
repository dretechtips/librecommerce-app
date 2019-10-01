import { IPayroll } from "../interface/Payroll.interface";
import { Money } from "../type/Money";
import { ServerError, ClientError } from "./Error";
import { Schedule, ScheduleManager } from "../model/Schedule";
import { User, UserManager } from "../model/User";

export class PayrollManager {
  public static from = class {
    public static active(): Payroll[] | null {
      const schedules: Schedule[] | null = ScheduleManager.from.active(true);
      if (!schedules)
        return null;
      const users: User[] = schedules.map(cur => UserManager.from.id(cur.getUserID())) as User[];
      if (users.length !== schedules.length)
        throw new ServerError("Every schedules must have one valid user.");
      const payrolls: Payroll[] = Array<Payroll>(schedules.length);
      for (let i = 0; i < schedules.length; i++) {
        const user: User = users[i];
        const payment: IPayroll.PaymentInfo = user.getPayment();
        const payroll: Payroll = new Payroll(payment, user.getID());
        payrolls[i] = payroll;
      }
      return payrolls;
    }
  }
}

export class Payroll {
  private _values: IPayroll.PaymentInfo;
  private _details: PayrollDetails;
  private _userID: string;
  constructor(info: IPayroll.PaymentInfo, userID: string) {
    this._values = info;
    this._userID = userID;
    let paypalVerified: boolean = this.validateBanking();
    let bankingVerified: boolean = this.validatePaypal();
    if (!(paypalVerified || bankingVerified))
      throw new ClientError("Both client paypal and banking accounts aren't valid.");
    switch (this._values.details.type) {
      case "commission":
        this._details = new Commission(this._values.details)
        break;
      case "wage":
        this._details = new Wage(this._values.details)
        break;
      case "salary":
        this._details = new Salary(this._values.details)
        break;
    }
  }
  private validatePaypal(): boolean {
    // Talks to paypal over paypalme
    return false;
  }
  private validateBanking(): boolean {
    // Talks to paypal over bank account and routing number
    return false;
  }
  public getUserID(): string {
    return this._userID;
  }
  public toPrimObj(): IPayroll.Body {
    const obj: IPayroll.Body = {
      userID: this._userID,
      paypalMe: this._values.paypalMe.toJSON(),
      checking: this._values.checking,
      online: this._values.online,
      type: this._values.details.type,
      total: this._details.getPayment().getValue()
    }
    return obj;
  }
  public pay(): boolean {
    return false;
  }
}

export class PayrollDetails {
  protected _value: IPayroll.BaseConstructor;
  protected _payment: Money;
  constructor(constructor: IPayroll.BaseConstructor) {
    this._value = constructor;
  }
  public getPayment(): Money {
    return this._payment;
  }
}

export class Wage extends PayrollDetails {
  protected _value: IPayroll.WageConstructor;
  constructor(constructor: IPayroll.WageConstructor) {
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
    const OTWage: Money = new Money((OT * hourlyWage) * 1.5);
    const totalWage: Money = baseWage.add(OTWage);
    return totalWage;
  }
  
}

export class Salary extends PayrollDetails {
  protected _value: IPayroll.SalaryConstructor;
  constructor(constructor: IPayroll.SalaryConstructor) {
    super(constructor);
  }
  public calc(): Money {
    
  }
}

export class Commission extends PayrollDetails {
  protected _value: IPayroll.CommissionConstructor;
  constructor(constructor: IPayroll.CommissionConstructor) {
    super(constructor);
  }
  public calc(): Money {
    const total = this._value.total.getValue() * this._value.percent;
    return new Money(total);
  }
}