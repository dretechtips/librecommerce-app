import Mongoose from "mongoose";
import { PromoCodeCompileType } from "../../../interface/Promo.interface";
import Promo, { PromoRuntimeType } from "../../../model/Promo";
import Model from "../factory/Model";

const PromoCodeRuntimeType: Mongoose.TypedSchemaDefinition<PromoCodeCompileType> = {
  ...PromoRuntimeType,
  code: String
};

const PromoCodeSchema = new Mongoose.Schema<PromoCodeCompileType>(
  PromoCodeRuntimeType
);

class PromoCode extends Model("Promo Code", PromoCodeSchema, [Promo]) {}
