import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import AddressSchema from "./Address.schema";

export class ContactSchema extends Typegoose {
  @prop({ required: true })
  public firstName: string;
  @prop({ required: true })
  public lastName: string;
  @prop({ required: true })
  public emailAddress: string;
  @prop({ required: true })
  public address: AddressSchema;
  @prop({ required: true })
  public phone: string;
}

export interface ContactDependentDOT {
  contact: ContactSchema;
}

export default ContactSchema;
