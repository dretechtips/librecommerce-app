import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import { CalendarDay } from "./Calendar.interface";
import { EventService } from "./event/Event.service";
import { EventDOT, EventType, EventLink } from "./event/Event.interface";
import { RecurringDOT } from "./event/recurring/Recurring.interface";

@Injectable()
export class CalendarService {
  constructor(private readonly event: EventService) {}
  public getTodayDate(): Date {
    return new Date();
  }
  public getTodayDay(): CalendarDay {
    return CalendarDay[CalendarDay[this.getTodayDate().getDay()]];
  }
  public useEvent() {
    return this.event;
  }
}
