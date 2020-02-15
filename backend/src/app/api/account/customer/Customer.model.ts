import { CustomerDOT } from "./Customer.interface";
import { Typegoose, prop, arrayProp } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class CustomerSchema extends Typegoose implements CustomerDOT {
  @prop({ required: true })
  public accountID: string;
  @prop({ required: true })
  public orderIDs: string[];
  @prop({ required: true })
  public lastOrderDate: string;
  @prop({ required: true })
  public paymentsID: string;
  @arrayProp({ required: true })
  public subscriptionIDs: string[];
}

export class Customer extends ModelFactory(CustomerSchema) {}

export default Customer;
