import Mongoose from "mongoose";
import { VariationDOT } from "./Variation.interface";
import Model from "src/app/common/factory/Model.factory";

const VariationRuntimeType: Mongoose.TypedSchemaDefinition<VariationDOT> = {
  name: String,
  productID: String,
  price: Number,
  images: [String],
  size: String,
  color: String,
  stock: Number
};

const VariationSchema = new Mongoose.Schema<VariationDOT>(VariationRuntimeType);

export class Variation extends Model("Product Variation", VariationSchema) {}

export default Variation;
