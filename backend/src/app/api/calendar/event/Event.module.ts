import { Module } from "@nestjs/common";
import EventController from "./Event.controller";
import RecurringModule from "./recurring/Recurring.module";
import SingleModule from "./single/Single.module";

@Module({
  controllers: [EventController],
  exports: [RecurringModule, SingleModule],
  imports: [RecurringModule, SingleModule]
})
export class EventModule {}

export default EventModule;
