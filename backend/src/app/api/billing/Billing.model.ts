import Mongoose from "mongoose";
import { BillingDOT } from "./Billing.interface";
import Model, { ModelFactory } from "src/app/common/model/Model.factory";
import { Typegoose, arrayProp, prop } from "typegoose";

class BillingSchema extends Typegoose implements BillingDOT {
  @prop({ required: true })
  public date: Date;
  @prop({ required: false })
  public paymentID?: string;
  @prop({ required: true })
  public transactionID: string;
}

export class Billing extends ModelFactory(BillingSchema) {}

export default Billing;
