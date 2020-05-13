import { Module } from "@nestjs/common";
import { StoreController } from "./Store.controller";
import { StoreService } from "./Store.service";
import InternalModule from "./internal/Internal.module";
import ExternalModule from "./external/External.module";

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  exports: [InternalModule, ExternalModule],
  imports: [InternalModule, ExternalModule],
})
export class StoreModule {

}

export default StoreModule;