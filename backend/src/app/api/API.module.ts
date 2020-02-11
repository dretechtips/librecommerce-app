import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import AccountModule from "./account/Account.module";
import AlertModule from "./alert/Alert.module";
import BanModule from "./ban/Ban.module";
import BillingModule from "./billing/Billing.module";
import CartModule from "./cart/Cart.module";
import FilterModule from "./filter/Filter.module";
import LoginModule from "./login/Login.module";
import OrderModule from "./order/Order.module";
import PayrollModule from "./payroll/Payroll.module";
import ProductModule from "./product/Product.module";
import PromoModule from "./promo/Promo.module";
import SaleModule from "./sale/Sale.module";
import ScheduleModule from "./schedule/Schedule.module";
import SubscriptionModule from "./subscription/Subscription.module";
import TransactionModule from "./billing/transaction/Transaction.module";
import APIController from "./API.controller";
import { APIService } from "./API.service";
import { APILoggerMiddleware } from "./API.middleware";

const reexport = [
  AccountModule,
  AlertModule,
  BanModule,
  BillingModule,
  CartModule,
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
  }
  public logger(consumer: MiddlewareConsumer) {
    consumer.apply(APILoggerMiddleware).forRoutes("*");
  }
}

export default APIModule;
