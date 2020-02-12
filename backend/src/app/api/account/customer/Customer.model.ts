import { CustomerDOT } from "./Customer.interface";
import { Typegoose, prop } from "typegoose";
import ModelFactory from "src/app/common/model/Model.factory";

class CustomerSchema extends Typegoose implements CustomerDOT {
  @prop({ required: true })
  accountID: string;
  @prop({ required: true })
  orderIDs: string[];
  @prop({ required: true })
  lastOrderDate: string;
  @prop({ required: true })
  paymentsID: string;
}

export class Customer extends ModelFactory(CustomerSchema) {}

export default Customer;
