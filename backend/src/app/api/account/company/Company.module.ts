import { Module } from "@nestjs/common";
import ExternalModule from "./external/External.module";
import InternalModule from "./internal/Internal.module";

@Module({
  controllers: [],
  providers: [],
  imports: [ExternalModule, InternalModule],
  exports: [ExternalModule, InternalModule],
})
export class CompanyModule {
  
}

export default CompanyModule;