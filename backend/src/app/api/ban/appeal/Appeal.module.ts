import { Module } from "@nestjs/common";
import AppealController from "./Appeal.controller";

@Module({
  controllers: [AppealController]
})
export class AppealModule {}

export default AppealModule;
