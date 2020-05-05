import CostSchema from "./cost/Cost.schema";

export interface TransactionDOT {
  amountOwed: number;
  amountPayed: number;
  tax: number;
  charges: CostSchema[];
  isRefundable: boolean;
  type: TransactionType;
  paymentID?: string;
}

export enum TransactionType {
  /**
   * Places a hold on the payment method funds
   */
  AUTHORIZED,
  /**
   * Automatically deducts the fund if
   */
  SALE,
  /**
   * Automatically adds back to the fund
   */
  REFUND,
  /**
   * Cancels the hold on the payment method
   */
  VOID
}

export interface Transactable {
  cost: CostSchema;
}
