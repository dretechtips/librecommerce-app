import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import CartModule from "./cart/Cart.module";
import OrderModule from "./order/Order.module";
import ProductModule from "./product/Product.module";
import PromoModule from "./promo/Promo.module";
import SaleController from "./Sale.controller";
import SaleService from "./Sale.service";
import SaleTask from "./Sale.task";
import ShippingModule from "./shipping/Shipping.module";
import SubscriptionModule from "./subscription/Subscription.module";
import AccountModule from "../account/Account.module";

@Module({
  controllers: [SaleController],
  providers: [SaleService, SaleTask],
  exports: [SaleService],
  imports: [
    CartModule,
    OrderModule,
    ProductModule,
    PromoModule,
    ShippingModule,
    SubscriptionModule,
    AccountModule
  ]
})
export class SaleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default SaleModule;
