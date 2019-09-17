import { TimeRange } from "../type/Range";

export type Day = "mon" | "tues" | "wed" | "thur" | "fri" | "sat" | "sun";

export interface WeekConstrutor extends Array<Day> { };

export interface DayEvent {
  name: string,
  details: DayHour
}

export interface DayEventBody {
  name: string,
  details: DayHourBody
}

export interface DayHour {
  day: Day,
  hours?: TimeRange
}

export interface DayHourBody {
  day: Day,
  startTime: string,
  endTime: string,
}

export interface WeekEventsValues {
  mon: DayEvents,
  tues: DayEvents,
  wed: DayEvents,
  thur: DayEvents,
  fri: DayEvents,
  sat: DayEvents,
  sun: DayEvents
}

export interface DayEvents {
  events: Map<string, DayEvent>;
  limit: number;
}

export interface WeekEventsArray extends Array<DayEvent> { }

export interface WeekEventsBodyArray extends Array<DayEventBody> { }