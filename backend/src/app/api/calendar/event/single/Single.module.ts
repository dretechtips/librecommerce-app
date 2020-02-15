import { Module } from "@nestjs/common";
import SingleService from "./Single.service";
import SingleController from "./Single.controller";

@Module({
  controllers: [SingleController],
  providers: [SingleService]
})
export class SingleModule {}

export default SingleModule;
