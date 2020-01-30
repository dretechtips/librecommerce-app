import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import CustomerModule from "./customer/Customer.module";
import UserModule from "./user/User.model";
import { CreateAccountMiddleware } from "./Account.middleware";

@Module({
  controllers: [],
  imports: [UserModule, CustomerModule]
})
export class AccountModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    this.create(consumer);
  }
  /**
   * All create route requires a base account to be created before creating an detailed account
   * @param consumer Middleware Consumer
   */
  public create(consumer: MiddlewareConsumer) {
    consumer.apply(CreateAccountMiddleware).forRoutes("*/create");
  }
}

export default AccountModule;
