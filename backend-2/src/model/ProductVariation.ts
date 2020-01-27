import Mongoose from "mongoose";
import { ProductVariationCompileType } from "../interface/Product.interface";
import Model from "./Model";

const ProductVariationRuntimeType: Mongoose.TypedSchemaDefinition<ProductVariationCompileType> = {
  name: String,
  productID: String,
  price: Number,
  images: [String],
  size: String,
  color: String,
  stock: Number
};

const ProductVariationSchama = new Mongoose.Schema<ProductVariationCompileType>(
  ProductVariationRuntimeType
);

class ProductVariation extends Model(
  "Product Variation",
  ProductVariationSchama
) {}

export default ProductVariation;
