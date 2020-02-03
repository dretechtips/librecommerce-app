import { Module } from "@nestjs/common";
import ProductController from "./Product.controller";
import ProductService from "./Product.service";
import VariationModule from "./variation/Variation.module";
import CategoryModule from "./category/Category.module";
import ReviewModule from "./review/Review.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [VariationModule, CategoryModule, ReviewModule]
})
export class ProductModule {}

export default ProductModule;
