import { Typegoose } from "typegoose";
import { prop } from "typegoose/lib/prop";

export enum MoneyCurrency {
  USD,
  EURO,
  YEN
}

export class MoneySchema extends Typegoose {
  @prop({ required: true })
  public value: number;
  @prop({ required: true, enum: MoneyCurrency })
  public currency: MoneyCurrency;
}

export default MoneySchema;
