import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import CustomerController from "./Customer.controller";
import { CreateAccountMiddleware } from "../Account.middleware";
import CustomerService from "./Customer.service";

@Module({
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.attachAccountCreate(consumer);
  }
  public attachAccountCreate(consumer: MiddlewareConsumer) {
    consumer.apply(CreateAccountMiddleware).forRoutes("create");
  }
}

export default CustomerModule;
