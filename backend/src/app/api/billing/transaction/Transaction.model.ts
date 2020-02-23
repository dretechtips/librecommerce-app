import Mongoose from "mongoose";
import { Typegoose, prop } from "typegoose";
import {
  TransactionDOT,
  Transactable,
  TransactionType
} from "./Transaction.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import CostSchema from "./cost/Cost.schema";

export class TransactionSchema extends Typegoose implements TransactionDOT {
  @prop({ required: true })
  amountOwed: number;
  @prop({ required: true })
  amountPayed: number;
  @prop({ required: true })
  tax: number;
  @prop({ required: true })
  charges: CostSchema[];
  @prop({ required: true, enum: TransactionType })
  type: TransactionType;
}

export class Transaction extends ModelFactory(TransactionSchema) {}

export default Transaction;
