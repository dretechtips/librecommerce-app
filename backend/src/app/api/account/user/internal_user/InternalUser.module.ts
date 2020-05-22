import { Module } from "@nestjs/common";
import InternalUserService from "./InternalUser.service";
import InternalUserController from "./InternalUser.controller";
import PayrollModule from "./payroll/Payroll.module";

@Module({
  controllers: [InternalUserController],
  providers: [InternalUserService],
  imports: [PayrollModule],
  exports: [PayrollModule],
})
export class InternalModule {

}

export default InternalModule;