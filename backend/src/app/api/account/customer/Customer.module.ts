import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AccountDependentModule } from "../Account.factory.txt";
import CustomerController from "./Customer.controller";
import CustomerService from "./Customer.service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule extends AccountDependentModule
  implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    super.configure(consumer);
  }
}

export default CustomerModule;
