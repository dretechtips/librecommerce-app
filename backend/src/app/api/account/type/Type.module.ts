import { Module } from "@nestjs/common";
import CustomerModule from "./customer/Customer.module";
import TypeController from "./Type.controller";
import TypeService from "./Type.service";
import UserModule from "./user/User.module";

@Module({
  controllers: [TypeController],
  imports: [UserModule, CustomerModule],
  providers: [TypeService]
})
export class TypeModule {}

export default TypeModule;
