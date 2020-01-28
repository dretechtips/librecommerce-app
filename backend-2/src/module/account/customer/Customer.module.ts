import { Module } from "@nestjs/common";
import CustomerController from "./Customer.controller";

@Module({
  controllers: [CustomerController],
})
export class CustomerModule {
  
}

export default CustomerModule;
