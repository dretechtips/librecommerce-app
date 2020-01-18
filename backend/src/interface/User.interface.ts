import { AccountCompileType } from "../interface/Account.interface";

export interface UserCompileType extends AccountCompileType {
  scheduleID: string;
  position: string;
  //payment: string;
  lastPayed: string;
  payrollID: string;
}
