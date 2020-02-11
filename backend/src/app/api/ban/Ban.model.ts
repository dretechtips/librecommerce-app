import Mongoose from "mongoose";
import { BanDOT } from "./Ban.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import Account from "src/app/api/account/Account.model";
import { Typegoose, prop } from "typegoose";

class BanSchema extends Typegoose implements BanDOT {
  @prop({ required: true })
  accountID: string;
  @prop({ required: true })
  date: string;
  @prop({ required: true })
  reason: string;
}

export class Ban extends ModelFactory(BanSchema) {}

export default Ban;
