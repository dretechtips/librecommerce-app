import { Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import Service from "src/app/common/service/Service.factory";
import { CalendarDay, CalendarSpan } from "../calendar/Calendar.interface";
import { EventDOT } from "../calendar/event/Event.interface";
import { RecurringDOT } from "../calendar/event/recurring/Recurring.interface";
import { RecurringService } from "../calendar/event/recurring/Recurring.service";
import Schedule from "./Schedule.model";

@Injectable()
export class ScheduleService extends Service<typeof Schedule> implements OnModuleInit {
  private recurring: RecurringService;
  constructor(private readonly moduleRef: ModuleRef) {
    super(Schedule);
  }
  public onModuleInit() {
    this.recurring = this.moduleRef.get(RecurringService);
  }
  public async updateByDay(
    id: string,
    day: CalendarDay,
    eventDOTs: EventDOT[]
  ) {
    const start = new Date();
    const recurringEvents: RecurringDOT[] = (await this.addAll(eventDOTs)).map(
      cur => {
        const event: RecurringDOT = {
          eventID: cur._id,
          day: day,
          span: CalendarSpan.WEEK,
          start: start
        };
        return event;
      }
    );
  }
  public async updateByEventID(
    id: string,
    day: CalendarDay,
    eventID: string,
    event: EventDOT
  ) {}
}

export default ScheduleService;
