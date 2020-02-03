import { Module } from "@nestjs/common";
import PayrollController from "./Payroll.controller";

@Module({
  controllers: [PayrollController]
})
export class PayrollModule {}

export default PayrollModule;
