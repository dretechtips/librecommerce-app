import Mongoose from "mongoose";
import { PromoDOT } from "./Promo.interface";
import Model from "src/common/factory/Model.factory";

export const PromoRuntimeType: Mongoose.TypedSchemaDefinition<PromoDOT> = {
  discount: Number,
  start: String,
  end: String
};

const PromoSchema = new Mongoose.Schema<PromoDOT>(PromoRuntimeType);

export class Promo extends Model("Promo", PromoSchema, [], true) {}

export default Promo;
