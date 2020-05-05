import { Module } from "@nestjs/common";
import BanController from "./Ban.controller";
import BanService from "./Ban.service";
import AppealModule from "./appeal/Appeal.module";

@Module({
  controllers: [BanController],
  providers: [BanService],
  exports: [AppealModule]
})
export class BanModule {}

export default BanModule;
