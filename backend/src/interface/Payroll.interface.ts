import { Money } from "../type/Money";

export namespace IPayroll {
  export interface CheckingAccount {
    routing: number;
    account: number;
  }
  export enum Absence {
    EXCUSSED,
    UNEXCUESSED
  }
  export type PaymentType = "wage" | "salary" | "commission" ;
  export interface PaymentInfo {
    paypalMe?: URL,
    checking?: CheckingAccount,
    online: boolean,
    details: WageConstructor | SalaryConstructor | CommissionConstructor
  }
  export interface BaseConstructor {
    hoursEachWeek: number[],
  }
  export interface WageConstructor extends BaseConstructor {
    hourly: Money,
    type: "wage",
  }
  export interface SalaryConstructor extends BaseConstructor {
    salary: Money,
    deducation: Money[],
    type: "salary"
  }
  export interface CommissionConstructor extends BaseConstructor {
    percent: number,
    total: Money,
    type: "commission",
  }
  export interface Body {
    userID: string,
    paypalMe?: string,
    checking?: CheckingAccount,
    online: boolean,
    type: PaymentType,
    total: number,
  }
}
