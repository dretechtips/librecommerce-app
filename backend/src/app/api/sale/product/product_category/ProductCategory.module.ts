import { Module } from "@nestjs/common";
import ProductCategoryController from "./ProductCategory.controller";
import ProductCategoryService from "./ProductCategory.service";

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule {}

export default ProductCategoryModule;
