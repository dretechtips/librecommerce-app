import Mongoose from "mongoose";
import { CategoryDOT } from "./Category.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import { Typegoose } from "typegoose";

export class CategorySchema extends Typegoose implements CategoryDOT {
  name: string;
}

export const Category = ModelFactory(CategorySchema);

export default ProductCategory;
