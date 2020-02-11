export interface UserDOT {
  accountID: string;
  scheduleID: string;
  position: string;
  //payment: string;
  lastPayed: string;
  payrollID: string;
}

export type PreUserDOT = Pick<UserDOT, "position">;

export enum UserPositions {
  DEVELOPER,
  STOCKER
}
