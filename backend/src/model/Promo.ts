import Mongoose from "mongoose";
import { PromoCompileType } from "../interface/Promo.interface";
import Model from "../factory/Model";

export const PromoRuntimeType: Mongoose.TypedSchemaDefinition<PromoCompileType> = {
  discount: Number,
  start: String,
  end: String
};

const PromoSchema = new Mongoose.Schema<PromoCompileType>(PromoRuntimeType);

export class Promo extends Model("Promo", PromoSchema, [], true) {}

export default Promo;
