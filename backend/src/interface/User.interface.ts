import { Address, EmailAddress, PhoneNum } from '../type/Location';
import { Schedule } from '../model/Schedule';
import { Alert } from '../model/Alert';
import { ScheduleBody } from './Schedule.inteface';
import * as IAccount from './Account.interface';
import Payment from '../type/Payment';
import { UserPayroll } from './Payroll.interface';

export namespace IUser {
  export interface Constructor extends IAccount.Constructor {
    privilege: PRIVILEGE;
    schedule: Schedule;
    position: Position;
    payment: Payment;
    payroll: UserPayroll;
  }
  export interface Value extends Constructor {
    lastPayment?: Date;
    rank: RANK;
  }
  export interface NewBody extends IAccount.NewBody {
    address: string;
    position: Position;
    privilege: PRIVILEGE;
    schedule: ScheduleBody;
    payment: Payment;
  }
  export type Position = 'OWNER' | 'MANAGER' | 'STOCKER_SHIPPER' | 'DEVELOPER';
  export type RANK = 'RANK_1' | 'RANK_2' | 'RANK_3';
  export enum PRIVILEGE {
    BASIC,
    MOD,
    ADMIN
  }
}
