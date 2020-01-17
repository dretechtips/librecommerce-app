import { ProductCompileType } from "../interface/Product.interface";
import Mongoose from "mongoose";
import Model from "../factory/Model";
import ProductReview from "./ProductReview";

const ProductRuntimeType: Mongoose.TypedSchemaDefinition<ProductCompileType> = {
  name: String,
  categoryID: String,
  description: String,
  brand: String,
  directions: [String],
  warning: String,
  ingredients: [String],
  benefits: [String],
  rating: Number,
  ratingAmount: Number
};

const ProductSchema = new Mongoose.Schema<ProductCompileType>(
  ProductRuntimeType
);

class Product extends Model("Product", ProductSchema) {
  public getReviews(): Promise<ProductReview[] | null> {
    const id = this.id();
    const reviews = ProductReview.getSelfBy("productID", id);
    return reviews as Promise<ProductReview[] | null>;
  }
}

export default Product;
