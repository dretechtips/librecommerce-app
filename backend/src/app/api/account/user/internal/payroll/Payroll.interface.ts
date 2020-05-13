export interface PayrollDOT {
  userID: string;
  active: PayrollType;
  wageID?: string;
  salaryID?: string;
  commissionID?: string;
}

export enum PayrollType {
  SALARY,
  COMMISSION,
  WAGE
}

export interface PayrollDependentDOT {
  payrollID: string;
}
