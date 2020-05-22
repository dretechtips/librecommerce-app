import ModelFactory from "src/app/common/model/Model.factory";
import { prop } from "@typegoose/typegoose";
import { ProductReviewDOT } from "./ProductReview.interface";

class ProductReviewSchema implements ProductReviewDOT {
  @prop({ required: true })
  productID: string;
  @prop({ required: true, min: 1, max: 5 })
  stars: number;
  @prop({required: true, maxLength: 160})
  statement: string
}

export class ProductReview extends ModelFactory(ProductReviewSchema) {};


export default ProductReview;
