import Mongoose from "mongoose";
import { ProductCategoryDOT } from "./ProductCategory.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { prop, arrayProp } from "@typegoose/typegoose";

export class ProductCategorySchema implements ProductCategoryDOT {
  @prop({required: true, default: "Default Category"})
  name: string;
  @arrayProp({required: true, default: []})
  tags: string[]
  
}

export class ProductCategory extends ModelFactory(ProductCategorySchema) {}

export default ProductCategory;
