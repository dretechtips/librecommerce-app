import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import ShippingController from "./Shipping.controller";
import ShippingService from "./Shipping.service";
import BoxModule from "./packages/package/box/Box.module";

@Module({
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [BoxModule],
  imports: [BoxModule]
})
export class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default ShippingModule;
