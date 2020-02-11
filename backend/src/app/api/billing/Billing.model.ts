import Mongoose from "mongoose";
import { BillingDOT } from "./Billing.interface";
import Model, { ModelFactory } from "src/app/common/model/Model.factory";
import { Typegoose, arrayProp, prop } from "typegoose";

class BillingSchema extends Typegoose implements BillingDOT {
  @prop({ required: true })
  start: Date;
  @prop({ required: true })
  end: Date;
  @arrayProp({ required: true })
  transactionIDs: string[];
}

export const Billing = ModelFactory(BillingSchema);

export default Billing;
