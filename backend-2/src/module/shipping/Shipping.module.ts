import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import ShippingController from "../controller/Shipping.controller";

@Module({
  controllers: [ShippingController]
})
class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
