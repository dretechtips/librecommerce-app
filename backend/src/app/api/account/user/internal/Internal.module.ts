import { Module } from "@nestjs/common";
import InternalService from "./Internal.service";
import InternalController from "./Internal.controller";
import PayrollModule from "./payroll/Payroll.module";

@Module({
  controllers: [InternalController],
  providers: [InternalService],
  imports: [PayrollModule],
  exports: [PayrollModule],
})
export class InternalModule {

}

export default InternalModule;