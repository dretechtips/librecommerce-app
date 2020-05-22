import { Module } from "@nestjs/common";
import PaymentsController from "./Payments.controller";
import PaymentsService from "./Payments.service";

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {
  
}

export default PaymentsModule;