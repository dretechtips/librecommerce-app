import { Typegoose, prop, arrayProp } from "typegoose";
import { AccountDOT } from "./Account.interface";
import ModelFactory from "src/app/common/model/Model.factory";

class AccountSchema extends Typegoose implements AccountDOT {
  @prop({ required: true, maxlength: 32 })
  public firstName: string;
  @prop({ required: true, maxlength: 32 })
  public lastName: string;
  @prop({ required: true })
  public username: string;
  @prop({ required: true })
  public password: string;
  @arrayProp({ required: true })
  public fingerprints: string[];
  @prop({ required: true })
  public emailAddress: string;
  @prop({ required: true })
  phoneNum: string;
  @prop({ required: true })
  address: string;
  @prop({ required: true })
  alertIDs: string[];
  public get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

export class Account extends ModelFactory(AccountSchema) {}

export default Account;
