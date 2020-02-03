import { Module } from "@nestjs/common";
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
import TransactionModule from "./transaction/Transaction.module";
import APIController from "./API.controller";
import { APIService } from "./API.service";

@Module({
  controllers: [APIController],
  providers: [APIService],
  exports: [
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
  ]
})
export class APIModule {}

export default APIModule;
