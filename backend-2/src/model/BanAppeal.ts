import Mongoose from "mongoose";
import { BanAppealCompileType } from "../interface/Ban.interface";
import Model from "../factory/Model";
import { Ban } from "./Ban";

const BanAppealRuntimeType: Mongoose.TypedSchemaDefinition<BanAppealCompileType> = {
  message: String,
  banID: String,
  resolution: String
};

const BanAppealSchema = new Mongoose.Schema<BanAppealCompileType>(
  BanAppealRuntimeType
);

export class BanAppeal extends Model("Ban Appeal", BanAppealSchema) {
  public async validate() {
    await super.validate();
    if (Ban.isValidID(this.data().banID))
      throw new Error("Ban Appeal Ban ID is invalid");
  }
}
