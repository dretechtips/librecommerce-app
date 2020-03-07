import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import BoxModule from "./box/Box.module";
import PackageModule from "./package/Package.module";
import PalletModule from "./pallet/Pallet.module";
import ShippingController from "./Shipping.controller";
import ShippingService from "./Shipping.service";
import { ShippingTask } from "./Shipping.task";

@Module({
  controllers: [ShippingController],
  providers: [ShippingService, ShippingTask],
  exports: [BoxModule, PalletModule, PackageModule],
  imports: [BoxModule, PalletModule, PackageModule]
})
export class ShippingModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default ShippingModule;
