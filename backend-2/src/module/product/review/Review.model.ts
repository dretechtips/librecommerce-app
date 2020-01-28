import Mongoose from "mongoose";
import { ReviewDOT } from "./Review.interface";
import Model from "src/util/Model.factory";
import Product from "src/module/product/Product.model";

const ProductReviewRuntimeType: Mongoose.TypedSchemaDefinition<ReviewDOT> = {
  customerID: String,
  productID: String,
  stars: Number
};

const ProductReviewSchema = new Mongoose.Schema<ReviewDOT>(
  ProductReviewRuntimeType
);

class ProductReview extends Model("Product Review", ProductReviewSchema) {
  constructor(data: any) {
    super(data);
  }
  protected onSave() {
    this.updateProductRating();
  }
  private async updateProductRating() {
    const productID = this.data().productID;
    const product = await Product.getSelfByID(productID);
    if (product) {
      product.data().rating =
        (product.data().rating * product.data().ratingAmount +
          this.data().stars) /
        (product.data().ratingAmount + 1);
      product.data().ratingAmount++;
      product.save();
    }
    return;
  }
  public async validate() {
    await super.validate();
    if (this.data().stars > 5 || this.data().stars < 1)
      throw new Error("Product Review Stars Range from 1 - 5 Only!");
    if (Product.isValidID(this.data().productID))
      throw new Error("Product ID is not valid");
    // Validate Customer
  }
}

export default ProductReview;
