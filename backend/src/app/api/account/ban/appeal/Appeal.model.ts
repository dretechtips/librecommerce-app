import ModelFactory from "src/app/common/model/Model.factory";
import { prop, Typegoose } from "typegoose";
import { AppealDOT, AppealResolution } from "./Appeal.interface";

class AppealSchema extends Typegoose implements AppealDOT {
  @prop({ required: true })
  message: string;
  @prop({ required: true })
  banID: string;
  @prop({ required: true, enum: AppealResolution })
  resolution: AppealResolution;
}

export class Appeal extends ModelFactory(AppealSchema) {}

export default Appeal;
