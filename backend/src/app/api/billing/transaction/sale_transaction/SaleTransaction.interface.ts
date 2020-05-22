import { TransactionDOT } from "../Transaction.interface";

export interface SaleTransactionDOT extends TransactionDOT {
  isRefundable: boolean;
}