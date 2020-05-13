import { Global, Module } from "@nestjs/common";
import DisableableService from "./Disableable.service";

@Global()
@Module({
  controllers: [],
  providers: [DisableableService]
})
export class DisableableModule {
  
}

export default DisableableModule;