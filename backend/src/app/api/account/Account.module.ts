import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import CustomerModule from "./customer/Customer.module";
import UserModule from "./user/User.model";
import { CreateAccountMiddleware } from "./Account.middleware";
import AccountController from "./Account.controller";
import AccountService from "./Account.service";

@Module({
  controllers: [AccountController],
  imports: [UserModule, CustomerModule],
  providers: [AccountService]
})
export class AccountModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default AccountModule;
