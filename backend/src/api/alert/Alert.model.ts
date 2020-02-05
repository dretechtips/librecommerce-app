import Mongoose from "mongoose";
import { AlertDOT, AlertType } from "./Alert.interface";
import Model from "src/common/factory/Model.factory";

const AlertRuntimeType: Mongoose.TypedSchemaDefinition<AlertDOT> = {
  msg: String,
  type: String
};

const AlertSchema = new Mongoose.Schema<AlertDOT>(AlertRuntimeType);

export class Alert extends Model("alert", AlertSchema) {
  public async validate(): Promise<void> {}
}
