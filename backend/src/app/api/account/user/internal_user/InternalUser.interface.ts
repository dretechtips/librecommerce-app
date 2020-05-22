import { UserDOT } from "../User.interface";
import { ScheduleDependentDOT } from "src/app/api/schedule/Schedule.interface";
import { PayrollDependentDOT } from "./payroll/Payroll.interface";

export interface InternalUserDOT extends UserDOT, 
  ScheduleDependentDOT, 
  PayrollDependentDOT 
  {
  position: InternalPosition;
}

export enum InternalPosition {
  DEVELOPER,
  STOCKER,
  MANAGER
}