import { WeekConstrutor, Day, DayHour, WeekEventsArray, DayEvent, WeekEventsValues, WeekEventsBodyArray, DayEventBody } from "../interface/Week.interface";
import { Week } from "../type/Week";
import { TimeRange } from "./Range";
import hconsole from "../model/Console";
import uuid = require("uuid/v4");

export class WeekEvents
{
  private _value: WeekEventsValues;
  private _week: Day[] = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];
  constructor(week: WeekEventsArray)
  {
    const values: Day[] = Object.keys(this._value) as Day[];
    for (let i = 0; i < values.length; i++) {
      const cur: Day = values[i];
      this._value[cur].events = new Map();
      this._value[cur].limit = -1;
    }
    for (let i = 0; i < week.length; i++) {
      const cur: DayEvent = week[i];
      const day: Day = cur.details.day;
      this._value[day].events.set(uuid(), cur);
    }
  }
  public setEvent(name: string, day: Day, hours: TimeRange): void {
    try {
      if (this._value[day].limit === this._value[day].events.size + 1 && this._value[day].limit !== -1)
        throw new Error("The event limit has been reached on the day " + day.toUpperCase() + ".");
      const event: DayEvent = {
        name: name,
        details: {
          day: day,
          hours: hours
        }
      }
      this._value[day].events.set(uuid(), event);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public getEvent(eventID: string, day?: Day): DayEvent {
    if (day !== undefined) {
      const event: DayEvent = this._value[day].events.get(eventID);
      if (event !== undefined)
        return event;
      else
        return null;
    }
    else {
      for (let i = 0; this._week.length; i++) {
        const cur = this._week[i];
        const event: DayEvent = this._value[day].events.get(eventID);
        if (event !== undefined)
          return event;
        else
          return null;
      }
    }
  }
  public getLimit(day: Day): number {
    return this._value[day].limit;
  }
  public setLimit(limit: number, day: Day): void {
    try {
      if (this._value[day].events.size > limit)
        throw new Error("The event limit must be set before the adding any events into the day.");
      this._value[day].limit = limit;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public setLimitAll(limit: number): void {
    const array: Day[] = ["mon", "tues",  "wed" , "thur" , "fri" , "sat" , "sun"];
    for (let i = 0; i < array.length; i++) {
      this.setLimit(limit, array[i]);
    }
  }
  public static generate(body: WeekEventsBodyArray): WeekEvents {
    const weekEvent: WeekEventsArray = body.map(cur => {
      const result: DayEventBody = {
        name: cur.name,
        details
      }
    })
  }
}