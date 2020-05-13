import { Module } from "@nestjs/common";
import ExternalController from "./External.controller";
import ExternalService from "./External.service";

@Module({
  controllers: [ExternalController],
  providers: [ExternalService]
})
export class ExternalModule {
  
}

export default ExternalModule;