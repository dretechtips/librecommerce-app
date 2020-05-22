import { Module } from "@nestjs/common";
import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import ProductCategoryModule from "./product_category/ProductCategory.module";
import ProductReviewModule from "./product_review/ProductReview.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductCategoryModule, ProductReviewModule]
})
export class ProductModule {
  
}

export default ProductModule;
