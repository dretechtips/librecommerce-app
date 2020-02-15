import { Injectable, Module } from "@nestjs/common";
import { RecurringService } from "./Recurring.service";
import RecurringController from "./Recurring.controller";

@Module({
  controllers: [RecurringController],
  providers: [RecurringService]
})
export class RecurringModule {}

export default RecurringModule;
