import { Module } from "@nestjs/common";
import ExternalUserController from "./ExternalUser.controller";
import ExternalUserService from "./ExternalUser.service";

@Module({
  controllers: [ExternalUserController],
  providers: [ExternalUserService]
})
export class ExternalModule {
  
}

export default ExternalModule;