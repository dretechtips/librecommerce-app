import CostSchema from "../cost/Cost.schema";

export interface TransactionDOT {
  /**
   * Money owed
   */
  amountOwed: number;
  /**
   * Money payed
   */
  amountPayed: number;
  /**
   * Subtotal Tax
   */
  tax: number;
  /**
   * Subtotal Tax Rate
   */
  taxRate: number;
  /**
   * Purchasable items and service.
   */
  charges: CostSchema[];
  /**
   * Is captured
   */
  captured: boolean;
  /**
   * Payment ID
   * Note: This is the individual payment not the payments.
   */
  paymentID?: string;
}

export enum TransactionType {
  /**
   * Sale based transaction
   */
  SALE,
  /**
   * Refund based transaction
   */
  REFUND,
  /**
   * Nullifies the transaction.
   */
  VOID,
}

export interface Transactable {
  cost: CostSchema;
}
