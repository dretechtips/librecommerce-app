import { Module } from "@nestjs/common";
import ExternalService from "./External.service";

@Module({
  controllers: [],
  providers: [ExternalService],
})
export class ExternalModule {
  
  

}

export default ExternalModule;

