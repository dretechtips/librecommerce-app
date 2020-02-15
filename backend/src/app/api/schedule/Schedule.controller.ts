import { Controller, Post } from "@nestjs/common";
import ScheduleService from "./Schedule.service";
import { CalendarDay } from "../calendar/Calendar.interface";

export const prefix = "schedule";

@Controller(prefix)
export class ScheduleController {
  constructor(private readonly schedule: ScheduleService) {}
  @Post("update/:id/:day/:eventID")
  public updateEvent() {}
  @Post("update/:id/:day")
  public updateDay(day: CalendarDay) {}
}

export default ScheduleController;
