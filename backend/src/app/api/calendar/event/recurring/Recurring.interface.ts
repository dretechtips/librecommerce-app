import { EventLink } from "../Event.interface";
import { CalendarDay, CalendarSpan } from "../../Calendar.interface";

export interface RecurringDOT extends EventLink {
  /** Day of the week */
  day: CalendarDay;
  /** Timespan to refresh */
  span: CalendarSpan;
  /** Start Date of the recurring event */
  start: Date;
}
