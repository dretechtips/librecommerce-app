import { Controller } from "@nestjs/common";
import ScheduleService from "./Schedule.service";

export const prefix = "schedule";

@Controller(prefix)
export class ScheduleController {
  constructor(private readonly schedule: ScheduleService) {}
}

export default ScheduleController;
