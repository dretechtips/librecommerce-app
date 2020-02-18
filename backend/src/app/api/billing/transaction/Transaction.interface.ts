import Service from "src/app/common/service/Service.factory";
import { Typegoose } from "typegoose";
import DimensionSchema from "src/app/common/model/schema/Dimension.schema";

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
  getCosts(obj: T): Promise<SubCost[]>;
}

export interface SubCost {
  name: string;
  cost: number;
  id: string;
}
