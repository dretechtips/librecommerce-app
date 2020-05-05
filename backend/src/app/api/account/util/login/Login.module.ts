import { Global, Module } from "@nestjs/common";
import LoginController from "./Login.controller";

@Global()
@Module({
  controllers: [LoginController]
})
export class LoginModule {}

export default LoginModule;
