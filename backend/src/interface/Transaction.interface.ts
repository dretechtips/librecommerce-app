import { IPAddress, EmailAddress } from "../type/Location";
import Controller from "../factory/Controller";
import Model from "../factory/Model";

export interface TransactionCompileType {
  ipAddress: string;
  amountOwed: number;
  amountPayed: number;
  tax: number;
  charges: SubCost[];
  type: string;
}

export type TransactionClassType = "customer";

export type TransactionType = "sales" | "refund" | "rebate";

export interface CustomerTransactionCompileType extends TransactionCompileType {
  orderID: string;
  shippingID: string;
  cartID: string;
}

export interface Transactable {
  getCharges: () => Promise<SubCost[]>;
}

export interface SubCost {
  name: string;
  cost: number;
}

export interface TransactablePair {
  model: { new (data: any): Transactable } & ReturnType<typeof Model>;
  controller: Controller<any>;
}
