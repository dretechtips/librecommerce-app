import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import ShippingController from "./Shipping.controller";
import ShippingService from "./Shipping.service";

@Module({
  controllers: [ShippingController],
  providers: [ShippingService]
})
export class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default ShippingModule;
