import Mongoose from "mongoose";
import { BanDOT } from "./Ban.interface";
import Model from "src/util/Model.factory";
import Customer from "src/api/account/customer/Customer.model";

const BanRuntimeType: Mongoose.TypedSchemaDefinition<BanDOT> = {
  customerID: String,
  date: String
};

const BanSchema = new Mongoose.Schema<BanDOT>(BanRuntimeType);

export class Ban extends Model("Ban", BanSchema) {
  public async validate() {
    super.validate();
    if (!Customer.isValidID(this.data().customerID))
      throw new Error("Ban Customer ID is invalid");
  }
}
