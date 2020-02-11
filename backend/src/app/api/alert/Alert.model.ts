import Mongoose from "mongoose";
import { AlertDOT, AlertType } from "./Alert.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose, prop } from "typegoose";
import { Model } from "mongoose";
import { Document } from "mongoose";

class AlertSchema extends Typegoose implements AlertDOT {
  @prop({ required: true })
  msg: string;
  @prop({ required: true, enum: AlertType })
  type: AlertType;
}

export class Alert extends ModelFactory(AlertSchema) {}

export default Alert;
