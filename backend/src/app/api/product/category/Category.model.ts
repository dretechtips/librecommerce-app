import Mongoose from "mongoose";
import { CategoryDOT } from "./Category.interface";
import Model from "src/app/common/factory/Model.factory";

const ProductCategoryRuntimeType: Mongoose.TypedSchemaDefinition<CategoryDOT> = {
  name: String
};

const ProductCategorySchema = new Mongoose.Schema<CategoryDOT>(
  ProductCategoryRuntimeType
);

class ProductCategory extends Model(
  "Product Category",
  ProductCategorySchema
) {}

export default ProductCategory;
