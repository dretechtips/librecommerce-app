import { Global, Module } from "@nestjs/common";
import ConfigService from "./Config.service";

@Global()
@Module({
  controllers: [],
  providers: [ConfigService]
})
export class ConfigModule {

}

export default ConfigModule;