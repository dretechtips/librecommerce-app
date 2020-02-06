import { Module } from "@nestjs/common";
import PayflowModule from "./payflow/Payflow.module";
import PaypalController from "./Paypal.controller";

@Module({
  controllers: [PaypalController],
  exports: [PayflowModule],
  imports: [PayflowModule]
})
export class PaypalModule {}

export default PaypalModule;
