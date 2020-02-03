import { Module } from "@nestjs/common";
import ProductController from "src/api/product/Product.controller";

@Module({
  controllers: [ProductController]
})
export class ProductModule {}

export default ProductModule;
