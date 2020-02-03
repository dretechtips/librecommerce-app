import { Module } from "@nestjs/common";
import FeedService from "./Feed.service";
import OrderModule from "./order/Order.module";
import ProductModule from "./product/Product.module";

@Module({
  controllers: [],
  providers: [FeedService],
  exports: [OrderModule, ProductModule]
})
export class FeedModule {}

export default FeedModule;
