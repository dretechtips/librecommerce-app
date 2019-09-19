import { WeekEvents } from "../type/WeekEvents";
import { TimeRange } from "../type/Range";
import { WeekEventsArray, WeekEventsBodyArray } from "./Week.interface";

export interface ScheduleConstructor {
  userID: string,
  scheduleID: string,
  events: WeekEvents,
  hasOverTime: boolean
}


export interface ScheduleBody {
  userID: string,
  events: WeekEventsBodyArray,
  hasOverTime: boolean,
}
