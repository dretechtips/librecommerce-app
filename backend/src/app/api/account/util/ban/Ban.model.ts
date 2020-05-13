import ModelFactory from "src/app/common/model/Model.factory";
import { BanDOT, BanLifetime } from "./Ban.interface";
import { prop, arrayProp } from "@typegoose/typegoose";

class BanSchema implements BanDOT {
  @prop({ required: true })
  public accountID: string;
  @prop({ required: true })
  public reason: string;
  @prop({ required: true, default: false })
  public revoke: boolean;
  @prop({ required: true, enum: BanLifetime, default: BanLifetime.TEMPORARY })
  public lifetime: BanLifetime;
  @arrayProp({required: true, default: []})
  public appealIDs: string[];
}

export class Ban extends ModelFactory(BanSchema) {}

export default Ban;
