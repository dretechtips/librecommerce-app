import ModelFactory, { ExtendedModelFactory } from "src/app/common/model/Model.factory";
import { arrayProp, prop } from "@typegoose/typegoose";
import AccountSchema, { Account } from "../Account.model";
import { CompanyDOT } from "./Company.interface";

export class CompanySchema extends AccountSchema implements CompanyDOT {
  private static SetTaxID(id: string): string {
    // TODO: Algorithms
    return "";
  }
  
  @prop({ required: true })
  public name: string;
  @prop({ required: true, set: CompanySchema.SetTaxID })
  public taxID: string;
  @arrayProp({ required: true, default: [] })
  public storeIDs: string[];
}

export class Company extends ExtendedModelFactory(Account, CompanySchema) {}

export default Company;
