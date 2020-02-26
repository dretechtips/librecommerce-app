import CostSchema from "./cost/Cost.schema";

export interface TransactionDOT {
  amountOwed: number;
  amountPayed: number;
  tax: number;
  charges: CostSchema[];
  type: TransactionType;
}

export enum TransactionType {
  SALE,
  REFUND,
  REBATE
}

export interface Transactable {
  costs: CostSchema[];
}
