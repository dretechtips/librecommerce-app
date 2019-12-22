export interface Payroll {
  mode: PayrollMode;
  wage?: Wage;
  salary?: Salary;
  commission?: Commission;
}

export type PayrollMode = "wage" | "salary" | "commision";

export interface Wage {
  rate: number;
}

export interface Salary {
  deduction: number[];
  base: number;
  bonuses: number[];
}

export interface Commission {
  percent: number;
}
