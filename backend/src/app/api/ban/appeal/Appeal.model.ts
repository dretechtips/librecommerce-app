import Mongoose from "mongoose";
import { AppealDOT } from "./Appeal.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import Ban from "../Ban.model";
import { Typegoose, prop } from "typegoose";

class AppealSchema extends Typegoose implements AppealDOT {
  @prop({ required: true })
  message: string;
  @prop({ required: true })
  banID: string;
  @prop({ required: true })
  resolution: string;
}

export class Appeal extends ModelFactory(AppealSchema) {}

export default Appeal;
