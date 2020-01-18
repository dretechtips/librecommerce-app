export interface PayrollCompileType {
  userID: string;
  active: string;
  wage: PayrollWage;
  salary: PayrollSalary;
  commission: PayrollCommission;
}

export interface PayrollWage {
  hourlyRate: number;
}

export interface PayrollSalary {
  base: number;
  bonuses: number[];
}

export interface PayrollCommission {
  percent: number;
}
