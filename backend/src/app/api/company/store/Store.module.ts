import { Module } from "@nestjs/common";
import StoreController from "./Store.controller";
import StoreService from "./Store.service";

@Module({
  controllers: [StoreController],
  providers: [StoreService]
})
export class StoreModule {}

export default StoreModule;
