import ModelFactory from "src/app/common/model/Model.factory";
import ContactSchema from "src/app/common/model/schema/Contact.schema";
import { arrayProp, prop, Typegoose } from "typegoose";
import { AccountDOT } from "./Account.interface";

class AccountSchema extends Typegoose implements AccountDOT {
  @prop({ required: true })
  public username: string;
  @prop({ required: true })
  public password: string;
  @arrayProp({ required: true })
  public fingerprints: string[];
  @prop({ required: true, default: true })
  public active: boolean;
  @prop({ required: true })
  public alertIDs: string[];
  @prop({ required: true })
  public contact: ContactSchema;
}

export class Account extends ModelFactory(AccountSchema) {}

export default Account;
