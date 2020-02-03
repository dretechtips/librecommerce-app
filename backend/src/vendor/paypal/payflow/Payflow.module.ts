import { Module } from "@nestjs/common";
import PayflowService from "./Payflow.service";

@Module({
  controllers: [],
  exports: [PayflowService]
})
export class PayflowModule {}

export default PayflowModule;
