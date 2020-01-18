import { TransactionCompileType } from "./Transaction.interface";

export interface BillingCompileType {
  start: string;
  end: string;
  ipAddress: string;
  transactionIDs: string[];
}
