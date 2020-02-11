import { ProductDOT } from "./Product.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import ProductReview from "./review/Review.model";
import { Typegoose, prop, arrayProp } from "typegoose";

class ProductSchema extends Typegoose implements ProductDOT {
  @prop({ required: true })
  name: string;
  @arrayProp({ required: true })
  features: string[];
  @prop({ required: true })
  SKU: string;
  @prop({ required: true })
  UPC: string;
  @prop({ required: true })
  categoryID: string;
  @prop({ required: true })
  description: string;
  @prop({ required: true })
  brand: string;
  @arrayProp({ required: true })
  directions: string[];
  @prop({ required: true })
  warning: string;
  @arrayProp({ required: true })
  ingredients: string[];
  @arrayProp({ required: true })
  benefits: string[];
  @prop({ required: true })
  rating: number;
  @prop({ required: true })
  ratingAmount: number;
  @prop({ required: true })
  launchDate: string;
  @prop({ required: true })
  releaseDate: string;
  @prop({ required: true })
  package: number;
  @prop({ required: true })
  perPackage: number;
}

export const Product = ModelFactory(ProductSchema);

export default Product;
