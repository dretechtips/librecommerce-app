import { Controller, Get } from "@nestjs/common";
import { EventService } from "./Event.service";

export const prefix = "event";

@Controller(prefix)
export class EventController {
  constructor(private readonly event: EventService) {}
}

export default EventController;
