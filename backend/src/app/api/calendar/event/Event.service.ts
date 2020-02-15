import { Injectable } from "@nestjs/common";
import Service from "src/app/common/service/Service.factory";
import Event from "./Event.model";
import { RecurringDOT } from "./recurring/Recurring.interface";
import { EventDOT } from "./Event.interface";
import { SingleDOT } from "./single/Single.interface";
import SingleService from "./single/Single.service";
import { RecurringService } from "./recurring/Recurring.service";

@Injectable()
export class EventService extends Service<Event> {
  constructor(
    private readonly single: SingleService,
    private readonly recurring: RecurringService
  ) {
    super(Event);
  }
  public async addSingleEvent(event: EventDOT, dot: SingleDOT) {
    await this.add(event);
    await this.single.add(event);
  }
  public async addRecurringEvent(event: EventDOT, dot: RecurringDOT) {
    await this.add(event);
    await this.recurring.add(dot);
  }
}
