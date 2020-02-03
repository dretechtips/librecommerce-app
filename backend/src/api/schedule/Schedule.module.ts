import { Module } from "@nestjs/common";
import ScheduleController from "./Schedule.controller";

@Module({
	controllers: [ScheduleController]
})
export class ScheduleModule {

}

export default ScheduleModule;