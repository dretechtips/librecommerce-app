import { Module } from "@nestjs/common";
import InternalStoreService from "./InternalStore.service";

@Module({
  controllers: [],
  providers: [InternalStoreService]
})
export class InternalStoreModule {

}

export default InternalStoreModule;