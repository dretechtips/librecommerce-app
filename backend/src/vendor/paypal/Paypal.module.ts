import { Module } from "@nestjs/common";
import PayflowModule from "./payflow/Payflow.module";

@Module({
  controllers: [],
  exports: [PayflowModule],
  imports: [PayflowModule]
})
export class PaypalModule {}

export default PaypalModule;
