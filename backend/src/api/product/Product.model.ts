import { ProductDOT } from "./Product.interface";
import Mongoose from "mongoose";
import Model from "src/common/factory/Model.factory";
import ProductReview from "./review/Review.model";

const ProductRuntimeType: Mongoose.TypedSchemaDefinition<ProductDOT> = {
  name: String,
  features: [String],
  SKU: String,
  UPC: String,
  categoryID: String,
  description: String,
  brand: String,
  directions: [String],
  warning: String,
  ingredients: [String],
  benefits: [String],
  rating: Number,
  ratingAmount: Number,
  launchDate: String,
  releaseDate: String,
  package: Number,
  perPackage: Number
};

const ProductSchema = new Mongoose.Schema<ProductDOT>(ProductRuntimeType);

class Product extends Model("Product", ProductSchema) {
  public getReviews(): Promise<ProductReview[] | null> {
    const id = this.id();
    const reviews = ProductReview.getSelfBy("productID", id);
    return reviews as Promise<ProductReview[] | null>;
  }
}

export default Product;
