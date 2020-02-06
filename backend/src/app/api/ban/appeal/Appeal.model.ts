import Mongoose from "mongoose";
import { AppealDOT } from "./Appeal.interface";
import Model from "src/app/common/factory/Model.factory";
import Ban from "../Ban.model";

const AppealRuntimeType: Mongoose.TypedSchemaDefinition<AppealDOT> = {
  message: String,
  banID: String,
  resolution: String
};

const AppealSchema = new Mongoose.Schema<AppealDOT>(AppealRuntimeType);

export class Appeal extends Model("Ban Appeal", AppealSchema) {
  public async validate() {
    await super.validate();
    if (Ban.isValidID(this.data().banID))
      throw new Error("Ban Appeal Ban ID is invalid");
  }
}

export default Appeal;
