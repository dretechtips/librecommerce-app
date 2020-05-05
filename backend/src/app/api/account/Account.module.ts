import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import AccountController from "./Account.controller";
import AccountService from "./Account.service";
import BanModule from "./util/ban/Ban.module";
import TypeModule from "./type/Type.module";

@Module({
  controllers: [AccountController],
  imports: [TypeModule, BanModule],
  providers: [AccountService]
})
export class AccountModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}

export default AccountModule;
