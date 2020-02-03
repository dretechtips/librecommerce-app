import Mongoose from "mongoose";
import { CodeDOT } from "./Code.interface";
import Model from "src/util/Model.factory";

const PromoCodeRuntimeType: Mongoose.TypedSchemaDefinition<CodeDOT> = {
  promoID: String,
  code: String
};

const PromoCodeSchema = new Mongoose.Schema<CodeDOT>(
  PromoCodeRuntimeType
);

class PromoCode extends Model("Promo Code", PromoCodeSchema, [Promo]) {}
