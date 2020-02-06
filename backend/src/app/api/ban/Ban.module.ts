import { Module } from "@nestjs/common";
import BanController from "./Ban.controller";

@Module({
  controllers: [BanController],
  exports: [BanModule]
})
export class BanModule {}

export default BanModule;
