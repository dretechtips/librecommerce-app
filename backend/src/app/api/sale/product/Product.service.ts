import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Product from "./Product.model";
import ProductReviewService from "./product_review/ProductReview.service";
import ProductCategoryService from "./product_category/ProductCategory.service";
import { InjectModel } from "src/app/common/model/Model.decorator";
import ProductCategory from "./product_category/ProductCategory.model";
import { ProductReviewDOT, ProductReviewDependentDOT } from "./product_review/ProductReview.interface";

@Injectable()
export class ProductService extends Service<Product> {

  constructor( 
    @InjectModel(Product) public readonly model: Product,
    private readonly review: ProductReviewService, 
    private readonly category: ProductCategoryService) {
      super();
  }

  /**
   * Grabs all the categories associated with the product.
   * @param product Product
   */
  public async getCategories(product: Product | string): Promise<ProductCategory[]> {
    return this.category.findByProduct(product);
  }

  /**
   * Adds a review for a product
   * @param reviewer Reviewer
   * @param review Review
   */
  public async addReview(reviewer: ProductReviewDependentDOT, review: ProductReviewDOT) {
    await this.get(review.productID);
    return this.review.add(review);
  }
  
}

export default ProductService;
