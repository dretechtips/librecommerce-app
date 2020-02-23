import { Module } from "@nestjs/common";
import ProductController from "src/app/api/sale/product/Product.controller";

@Module({
  controllers: [ProductController]
})
export class ProductModule {}

export default ProductModule;
