import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { BanDOT, BanLifetime } from "./Ban.interface";

class BanSchema extends Typegoose implements BanDOT {
  @prop({ required: true })
  public accountID: string;
  @prop({ required: true })
  public date: Date;
  @prop({ required: true })
  public reason: string;
  @prop({ required: true, default: false })
  public revoke: boolean;
  @prop({ required: true, enum: BanLifetime, default: BanLifetime.TEMPORARY })
  public lifetime: BanLifetime;
}

export class Ban extends ModelFactory(BanSchema) {}

export default Ban;
