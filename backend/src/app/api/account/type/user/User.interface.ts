import { PayrollDependentDOT } from "../../../human_resource/payroll/Payroll.interface";
import { ScheduleDependentDOT } from "../../../schedule/Schedule.interface";
import { AccountDependentDOT } from "../../Account.interface";

export interface UserDOT
  extends AccountDependentDOT,
    ScheduleDependentDOT,
    PayrollDependentDOT {
  position: UserPositions;
  lastPayed: Date;
}

export type NewUserDOT = Pick<UserDOT, "position">;

export enum UserPositions {
  DEVELOPER,
  STOCKER,
  MANAGER
}
