import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";
import { EmailDOT } from "./Email.interface";

class EmailSchema extends Typegoose implements EmailDOT {
  @prop({ required: true })
  public to: string;
  @prop({ required: true })
  public from: string;
  @prop({ required: true })
  public subject: string;
  @prop({ required: true })
  public bodyHTML: string;
}

export class Email extends ModelFactory(EmailSchema) {}
