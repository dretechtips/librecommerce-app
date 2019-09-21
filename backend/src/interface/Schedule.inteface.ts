import { WeekEvents } from "../type/Events";
import { TimeRange } from "../type/Range";
import { SingleEventBody } from "./Events.interface";

export interface ScheduleConstructor {
  userID: string,
  scheduleID: string,
  events: WeekEvents,
  hasOverTime: boolean
}


export interface ScheduleBody {
  userID: string,
  events: SingleEventBody[],
  hasOverTime: boolean,
}
