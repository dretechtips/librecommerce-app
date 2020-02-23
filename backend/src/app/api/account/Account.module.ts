import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import AccountController from "./Account.controller";
import { AccountType } from "./Account.interface";
import AccountService from "./Account.service";
import BanModule from "./ban/Ban.module";
import TypeModule from "./type/Type.module";

@Module({
  controllers: [AccountController],
  imports: [TypeModule, BanModule],
  providers: [AccountService]
})
export class AccountModule implements NestModule {
  public static readonly ALLOW_ACCESS: AccountType[] = [
    AccountType.ADMIN,
    AccountType.CUSTOMER
  ];
  public configure(consumer: MiddlewareConsumer) {}
}

export default AccountModule;
