import Mongoose from "mongoose";
import { ProductCategoryCompileType } from "../interface/Product.interface";
import Model from "../factory/Model";

const ProductCategoryRuntimeType: Mongoose.TypedSchemaDefinition<ProductCategoryCompileType> = {
  name: String
};

const ProductCategorySchema = new Mongoose.Schema<ProductCategoryCompileType>(
  ProductCategoryRuntimeType
);

class ProductCategory extends Model(
  "Product Category",
  ProductCategorySchema
) {}

export default ProductCategory;
