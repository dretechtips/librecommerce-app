import { Module } from "@nestjs/common";
import BillingController from "./BIlling.controller";

@Module({
  controllers: [BillingController]
})
export class BillingModule {}

export default BillingModule;
