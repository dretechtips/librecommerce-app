import Mongoose from "mongoose";
import { AlertDOT } from "./Alert.interface";
import Model from "src/util/Model.factory";

enum TYPE {
  SERVER = "SERVER",
  DATABASE = "DATABASE",
  CLIENT = "CLIENT",
  PAYPAL = "PAYPAL",
  GOOGLE = "GOOGLE",
}

const AlertRuntimeType: Mongoose.TypedSchemaDefinition<AlertDOT> = {
  msg: String,
  level: String,
  accountID: String,
} 

const AlertSchema = new Mongoose.Schema<AlertDOT>(AlertRuntimeType);

export class Alert extends Model("alert", AlertSchema) {
  public async validate(): Promise<void> {
    this.data().accountID
  }
}
