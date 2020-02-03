import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import ShippingController from "./Shipping.controller";

@Module({
  controllers: [ShippingController]
})
export class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default ShippingModule;
