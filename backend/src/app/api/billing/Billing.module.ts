import { Module } from "@nestjs/common";
import BillingController from "./BIlling.controller";
import { BillingService } from "./Billing.service";
import TransactionModule from "./transaction/Transaction.module";
import PaymentsModule from "./transaction/payments/Payments.module";

@Module({
  controllers: [BillingController],
  providers: [BillingService],
  imports: [TransactionModule, PaymentsModule]
})
export class BillingModule {}

export default BillingModule;
