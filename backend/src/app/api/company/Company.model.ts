import ModelFactory from "src/app/common/model/Model.factory";
import ContactSchema from "src/app/common/model/schema/Contact.schema";
import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { CompanyDOT } from "./Company.interface";

class CompanySchema extends Typegoose implements CompanyDOT {
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public taxID: string;
  @prop({ required: true, default: true })
  public active: boolean;
  @prop({ required: true })
  public contact: ContactSchema;
}

export class Company extends ModelFactory(CompanySchema) {}

export default Company;
