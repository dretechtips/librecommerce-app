import Service from "src/app/common/service/Service.factory";
import { Typegoose } from "typegoose";

export interface TransactionDOT {
  amountOwed: number;
  amountPayed: number;
  tax: number;
  charges: SubCost[];
  type: TransactionType;
}

export enum TransactionType {
  SALE,
  REFUND,
  REBATE
}

export interface Transactable<T extends Typegoose> {
  getCosts(doc: T): Promise<SubCost[]>;
}

export interface SubCost {
  name: string;
  cost: number;
}
