import { IPAddress, EmailAddress } from "../type/Location";

export interface TransactionCompileType {
  ipAddress: string;
  amountOwed: number;
  amountPayed: number;
  type: string;
}

export type TransactionClassType = "customer";

export interface CustomerTransactionCompileType extends TransactionCompileType {
  orderID: string;
  shippingID: string;
}
