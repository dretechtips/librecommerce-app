import ModelFactory from "src/app/common/model/Model.factory";
import { arrayProp, prop, Typegoose } from "typegoose";
import { CustomerDOT } from "./Customer.interface";

class CustomerSchema extends Typegoose implements CustomerDOT {
  @prop({ required: true })
  public accountID: string;
  @prop({ required: true })
  public lastOrderDate: Date;
  @arrayProp({ required: true })
  public saleIDs: string[];
  @arrayProp({ required: true })
  public paymentID: string;
  @arrayProp({ required: true })
  public subscriptionIDs: string[];
  @arrayProp({ required: true })
  public alertIDs: string[];
}

export class Customer extends ModelFactory(CustomerSchema) {}

export default Customer;
