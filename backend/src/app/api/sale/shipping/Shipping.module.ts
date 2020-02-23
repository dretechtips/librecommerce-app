import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import ShippingController from "./Shipping.controller";
import ShippingService from "./Shipping.service";
import BoxModule from "./box/Box.module";
import PalletModule from "./pallet/Pallet.module";
import PackageModule from "./package/Package.module";

@Module({
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [BoxModule, PalletModule, PackageModule],
  imports: [BoxModule, PalletModule, PackageModule]
})
export class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default ShippingModule;
