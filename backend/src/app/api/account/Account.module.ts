import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import AccountController from "./Account.controller";
import AccountService from "./Account.service";
import UserModule from "./user/User.module";
import CompanyModule from "./company/Company.module";
import StoreModule from "./store/Store.module";

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [UserModule, CompanyModule, StoreModule],
  exports: [UserModule, CompanyModule, StoreModule]
})
export class AccountModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default AccountModule;
