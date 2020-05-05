import { Module } from "@nestjs/common";
import EmployeeModule from "./human_resource/employee/Employee.module";
import StoreController from "./Store.controller";
import StoreService from "./Store.service";

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [EmployeeModule],
  exports: [EmployeeModule]
})
export class StoreModule {}

export default StoreModule;
