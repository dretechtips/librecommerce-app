import { Module } from "@nestjs/common";
import RefundTransactionService from "./RefundTransaction.service";

@Module({
  controllers: [],
  providers: [RefundTransactionService],
})
export class RefundTransactionModule {

}

export default RefundTransactionModule;