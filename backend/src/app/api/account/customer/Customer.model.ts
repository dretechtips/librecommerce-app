import ModelFactory, { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { arrayProp, prop } from "@typegoose/typegoose";
import AccountSchema, { Account } from "../Account.model";
import { CustomerDOT } from "./Customer.interface";

class CustomerSchema extends AccountSchema implements CustomerDOT {
  @arrayProp({ required: true })
  public subscriptionIDs: string[];
  @arrayProp({ required: true })
  public alertIDs: string[];
}

export class Customer extends ExtendedModelFactory(Account, CustomerSchema) {}

export default Customer;
