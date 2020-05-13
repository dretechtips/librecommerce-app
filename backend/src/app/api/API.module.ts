import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { CartTrackerMiddleware } from "src/app/api/sale/cart/Cart.middleware";
import AccountModule from "./account/Account.module";
import BanModule from "./account/util/ban/Ban.module";
import LoginModule from "./account/util/login/Login.module";
import PayrollModule from "./account/store/human_resource/employee/payroll/Payroll.module";
import AlertModule from "./alert/Alert.module";
import APIController from "./API.controller";
import { APILoggerMiddleware } from "./API.middleware";
import { APIService } from "./API.service";
import BillingModule from "./billing/Billing.module";
import TransactionModule from "./billing/transaction/Transaction.module";
import EmailModule from "./email/Email.module";
import FilterModule from "./filter/Filter.module";
import CartModule from "./sale/cart/Cart.module";
import OrderModule from "./sale/order/Order.module";
import ProductModule from "./sale/product/Product.module";
import PromoModule from "./sale/promo/Promo.module";
import SaleModule from "./sale/Sale.module";
import SubscriptionModule from "./sale/subscription/Subscription.module";
import ScheduleModule from "./schedule/Schedule.module";

const reexport = [
  AccountModule,
  AlertModule,
  BanModule,
  BillingModule,
  CartModule,
  EmailModule,
  FilterModule,
  LoginModule,
  OrderModule,
  PayrollModule,
  ProductModule,
  PromoModule,
  SaleModule,
  ScheduleModule,
  SubscriptionModule,
  TransactionModule
];

@Module({
  controllers: [APIController],
  providers: [APIService],
  imports: reexport,
  exports: reexport
})
export class APIModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.logger(consumer);
    this.cart(consumer);
  }
  public logger(consumer: MiddlewareConsumer) {
    consumer.apply(APILoggerMiddleware).forRoutes("*");
  }
  public cart(consumer: MiddlewareConsumer) {
    consumer.apply(CartTrackerMiddleware).forRoutes("*");
  }
}

export default APIModule;
