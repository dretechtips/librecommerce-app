import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AccountDependentModule } from "../../Account.factory";
import UserController from "./User.controller";
import UserService from "./User.service";

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule extends AccountDependentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    super.configure(consumer);
  }
}

export default UserModule;
