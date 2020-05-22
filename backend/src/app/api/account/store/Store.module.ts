import { Module } from "@nestjs/common";
import { StoreController } from "./Store.controller";
import { StoreService } from "./Store.service";
import InternalStoreModule from "./internal_store/InternalStore.module";
import ExternalStoreModule from "./external_store/ExternalStore.module";

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  exports: [InternalStoreModule, ExternalStoreModule],
  imports: [InternalStoreModule, ExternalStoreModule],
})
export class StoreModule {

}

export default StoreModule;