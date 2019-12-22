import { Money } from '../type/Money';
import Check from '../type/Check';
import { PaypalMe } from '../interface/Paypal.interface';
import CreditCard from '../type/CreditCard';
import Payment from '../type/Payment';
import User from '../model/User';
import { Schedule } from '../model/Schedule';

export enum Absence {
  EXCUSSED,
  UNEXCUESSED
}

export interface Constructor {
  payment: Payment;
  userID: string;
}

export interface Value extends Omit<Constructor, 'userID'> {
  tracked: [number, number, number, number];
  user: User;
  schedule: Schedule;
}

export type Mode = 'salary' | 'wage' | 'commission';

export interface UserPayroll {
  mode: Mode;
  wage?: WageConstructor;
  salary?: SalaryConstructor;
  commission?: CommissionConstructor;
}

export interface WageConstructor {
  rate: Money;
}

export interface SalaryConstructor {
  base: Money;
  deducation: Money[];
  bonuses: Money[];
}

export interface CommissionConstructor {
  percent: number;
}

export interface Body {
  userID: string;
  paypalMe?: string;
  checking?: CheckingAccount;
  online: boolean;
  type: PaymentType;
  total: number;
}

export interface SearchQuery {
  active: boolean;
}
