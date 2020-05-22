import { Module } from "@nestjs/common";
import ExternalStoreService from "./ExternalStore.service";

@Module({
  controllers: [],
  providers: [ExternalStoreService],
})
export class ExternalStoreModule {
  
  

}

export default ExternalStoreModule;

