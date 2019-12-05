export interface Payroll {
  mode: PayrollMode;
  wage?: Wage;
  salary?: Salary;
  commission?: Commission;
}

export type PayrollMode = "wage" | "salary" | "commision";

export interface Wage {}

export interface Salary {}

export interface Commission {}

export interface PayslipProps {}

export interface PayslipState {}

export interface PayslipUIProps extends PayslipProps {}
