import Mongoose from "mongoose";
import { CodeDOT } from "./Code.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";

class CodeSchema extends Typegoose implements CodeDOT {
  @prop({ required: true })
  promoID: string;
  @prop({ required: true })
  code: string;
}

export const Code = ModelFactory(CodeSchema);

export default Code;
