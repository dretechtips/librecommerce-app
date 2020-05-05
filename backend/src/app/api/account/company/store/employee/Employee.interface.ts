import { AccountDependentDOT } from "src/app/api/account/Account.interface";
import { ScheduleDependentDOT } from "src/app/api/schedule/Schedule.interface";
import { PayrollDependentDOT } from "./payroll/Payroll.interface";

export interface EmployeeDOT extends
    ScheduleDependentDOT,
    PayrollDependentDOT {
  position: EmployeePosition;
  lastPayed: Date;
}

export enum EmployeePosition {
  DEVELOPER,
  STOCKER,
  MANAGER
}
