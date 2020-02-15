import { Module } from "@nestjs/common";
import PaymentController from "../payments/Payments.controller";

@Module({
  controllers: [],
  exports: [PaymentController]
})
export class TransactionModule {}

export default TransactionModule;
