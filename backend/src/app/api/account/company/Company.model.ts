import ModelFactory, { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { arrayProp, prop } from "@typegoose/typegoose";
import AccountSchema, { Account } from "../Account.model";
import { CompanyDOT } from "./Company.interface";

class CompanySchema extends AccountSchema implements CompanyDOT {
  @prop({ required: true })
  public account: AccountSchema;
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public taxID: string;
  @arrayProp({ required: true, default: [] })
  public storeIDs: string[];
}

export class Company extends ExtendedModelFactory(Account, CompanySchema) {}

export default Company;
