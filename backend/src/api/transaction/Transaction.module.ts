import { Module } from "@nestjs/common";
import PaymentController from "./payment/Payment.controller";

@Module({
	controllers: [],
	exports: [PaymentController],
})
export class TransactionModule {

}

export default TransactionModule;