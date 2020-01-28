import Mongoose from "mongoose";
import { VariationDOT } from "./Variation.interface";
import Model from "src/util/Model.factory";

const ProductVariationRuntimeType: Mongoose.TypedSchemaDefinition<VariationDOT> = {
  name: String,
  productID: String,
  price: Number,
  images: [String],
  size: String,
  color: String,
  stock: Number
};

const ProductVariationSchama = new Mongoose.Schema<VariationDOT>(
  ProductVariationRuntimeType
);

class ProductVariation extends Model(
  "Product Variation",
  ProductVariationSchama
) {}

export default ProductVariation;
