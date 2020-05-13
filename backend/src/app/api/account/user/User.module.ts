import { Module } from "@nestjs/common";
import ExternalModule from "./external/External.module";
import InternalModule from "./internal/Internal.module";
import UserController from "./User.controller";
import UserService from "./User.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ExternalModule, InternalModule],
  exports: [ExternalModule, InternalModule],
})
export class UserModule {

}

export default UserModule;