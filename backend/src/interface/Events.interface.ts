import { TimeRange } from "../type/Range";
import { SingleEvent, DayEvents, WeekEvents } from "../type/Events";

export type Day = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type eventID = string;

export interface ISingleEvent {
  getStart(): string;
  getEnd(): string;
  getName(): string;
  getID(): eventID;
  getTotalHours(): number;
}

export interface SingleEventBody {
  name: string;
  day: Day;
  startTime: string;
  endTime: string;
}

export interface IDayEvents {
  getEvent(id: string): SingleEvent;
  addEvent(event: SingleEvent): void;
  deleteEvent(eventID: string): void;
  getTotalHours(): number;
  getLimit(): number;
  setLimit(limit: number): void;
  getSize(): number;
}

export interface IWeekEvents {
  getTotalHours(): number;
  addEvent(event: SingleEvent, day: Day): void;
  addEvents(event: SingleEvent[], day: Day): void;
  getEvent(eventID: string, day: Day): SingleEvent;
  getEventsByDay(day: Day): DayEvents;
  deleteEvent(eventID: string, day: Day): void;
  deleteEvents(events: [string, Day][]): void;
  getLimit(day: Day): number;
  getLimitAll(): number[];
  setLimit(limit: number, day: Day): void;
  setLimitAll(limit: number): void;
}
