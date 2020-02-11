import Mongoose from "mongoose";
import { ReviewDOT } from "./Review.interface";
import ModelFactory from "src/app/common/model/Model.factory";
import Product from "src/app/api/product/Product.model";
import { Typegoose, prop } from "typegoose";

class ReviewSchema extends Typegoose implements ReviewDOT {
  @prop({ required: true })
  productID: string;
  @prop({ required: true })
  customerID: string;
  @prop({ required: true })
  stars: number;
}

export const Review = ModelFactory(ReviewSchema);

// private async updateProductRating() {
//   const productID = this.data().productID;
//   const product = await Product.getSelfByID(productID);
//   if (product) {
//     product.data().rating =
//       (product.data().rating * product.data().ratingAmount +
//         this.data().stars) /
//       (product.data().ratingAmount + 1);
//     product.data().ratingAmount++;
//     product.save();
//   }
//   return;
// }

export default ProductReview;
