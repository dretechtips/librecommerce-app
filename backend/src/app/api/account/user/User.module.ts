import { Module } from "@nestjs/common";
import ExternalUserModule from "./external_user/ExternalUser.module";
import InternalUserModule from "./internal_user/InternalUser.module";
import UserController from "./User.controller";
import UserService from "./User.service";
import LoginModule from "./login/Login.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ExternalUserModule, InternalUserModule, LoginModule],
  exports: [ExternalUserModule, InternalUserModule, LoginModule],
})
export class UserModule {

}

export default UserModule;