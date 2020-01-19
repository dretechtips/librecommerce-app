import Mongoose from "mongoose";
import { BanCompileType } from "../interface/Ban.interface";
import Model from "../factory/Model";
import Customer from "./Customer";

const BanRuntimeType: Mongoose.TypedSchemaDefinition<BanCompileType> = {
  customerID: String,
  date: String
};

const BanSchema = new Mongoose.Schema<BanCompileType>(BanRuntimeType);

export class Ban extends Model("Ban", BanSchema) {
  public async validate() {
    super.validate();
    if (!Customer.isValidID(this.data().customerID))
      throw new Error("Ban Customer ID is invalid");
  }
}
