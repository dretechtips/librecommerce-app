import { Module } from "@nestjs/common";
import BoxController from "./Box.controller";
import BoxService from "./Box.service";

@Module({
  controllers: [BoxController],
  providers: [BoxService]
})
export class BoxModule {}

export default BoxModule;
