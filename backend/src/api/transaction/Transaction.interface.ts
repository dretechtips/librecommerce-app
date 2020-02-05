export interface TransactionDOT {
  ipAddress: string;
  amountOwed: number;
  amountPayed: number;
  tax: number;
  charges: SubCost[];
  type: string;
}

export type TransactionClassType = "customer";

export type TransactionType = "sale" | "refund" | "rebate";

export interface Transactable {
  getCharges: () => Promise<SubCost[]>;
}

export interface SubCost {
  name: string;
  cost: number;
}
