import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import CostSchema from "./cost/Cost.schema";
import { TransactionDOT, TransactionType } from "./Transaction.interface";

export class TransactionSchema extends Typegoose implements TransactionDOT {
  @prop({ required: true })
  public amountOwed: number;
  @prop({ required: true })
  public amountPayed: number;
  @prop({ required: true })
  public tax: number;
  @prop({ required: true })
  public charges: CostSchema[];
  @prop({ required: true, enum: TransactionType })
  public type: TransactionType;
  @prop({ required: false })
  public paymentID?: string;
}

export class Transaction extends ModelFactory(TransactionSchema) {}

export default Transaction;
