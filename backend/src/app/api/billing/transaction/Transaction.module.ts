import { Module } from "@nestjs/common";
import PaymentController from "./payments/Payments.controller";
import VoidTransactionModule from "./void_transaction/VoidTransaction.module";
import SaleTransactionModule from "./sale_transaction/SaleTransaction.module";
import RefundTransactionModule from "./refund_transaction/RefundTransaction.module";
import TransactionService from "./Transaction.service";
import TransactionController from "./Transaction.controller";

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [VoidTransactionModule, SaleTransactionModule, RefundTransactionModule],
  imports: [VoidTransactionModule, SaleTransactionModule, RefundTransactionModule],
})
export class TransactionModule {}

export default TransactionModule;
