import { Module } from "@nestjs/common";
import AppealController from "./Appeal.controller";
import AppealService from "./Appeal.service";

@Module({
  controllers: [AppealController],
  providers: [AppealService]
})
export class AppealModule {}

export default AppealModule;
