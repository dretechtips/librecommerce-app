import { WeekConstrutor, Day, DayHour, WeekEventsArray, DayEvent, WeekEventsValues, WeekEventsBodyArray, DayEventBody, DayEvents } from "../interface/Week.interface";
import { Week } from "../type/Week";
import { TimeRange } from "./Range";
import uuid = require("uuid/v4");

export class WeekEvents
{
  private _value: WeekEventsValues;
  private _week: Day[] = ["mon", "tues", "wed", "thur", "fri", "sat", "sun"];
  constructor(week: WeekEventsArray, limitEachDay?: number[])
  {
    for (let i = 0; i < this._week.length; i++) {
      const cur: Day = this._week[i];
      this._value[cur].events = new Map();
      this._value[cur].limit = limitEachDay ? limitEachDay[i] : -1;
    }
    this.setEvents(week);
  }
  public getTotalHour(): number {
    let hours: number = 0;
    for (let i: number = 0; i < this._week.length; i++) {
      const cur: DayEvents = this._value[this._week[i]];
      const array: DayEvent[] = Array.from(cur.events.values());
      array.forEach(cur => hours += cur.details.hours.getTotalHour());
    }
    return hours;
  }
  public setEvents(week: WeekEventsArray): void {
    for (let i = 0; i < week.length; i++) {
      const cur: DayEvent = week[i];
      const day: Day = cur.details.day;
      this._value[day].events.clear();
      this._value[day].events.set(uuid(), cur);
    }
  }
  public addEvent(name: string, day: Day, hours: TimeRange): void {
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
  public addEvents(week: WeekEventsArray) {
    for (let i = 0; i < week.length; i++) {
      const cur: DayEvent = week[i];
      const day: Day = cur.details.day;
      this._value[day].events.set(uuid(), cur);
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
  public deleteEvent(eventID: string, day?: Day): void {
    try {
      if (day !== undefined) {
        const isDeleted: boolean = this._value[day].events.delete(eventID);
        if (!isDeleted)
          throw new Error("System week events doesn't have the the id inputted.");
      }
      else {
        for (let i = 0; this._week.length; i++) {
          const cur: Day = this._week[i];
          const isDeleted: boolean = this._value[cur].events.delete(eventID);
          if (!isDeleted)
            throw new Error("System week events doesn't have the the id inputted.");
        }
      }
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public getLimit(day: Day): number {
    return this._value[day].limit;
  }
  public getLimitAll(): number[] {
    const limits: number[] = new Array<number>(7);
    for (let i = 0; i < this._week.length; i++) {
      const cur: Day = this._week[i];
      const limit = this.getLimit(cur);
      limits.push(limit);
    }
    return limits;
  }
  public setLimit(limit: number, day: Day): void {
    try {
      if (this._value[day].events.size >= limit)
        throw new Error("The week event has been exceeded. Please delete some events on " + day.toUpperCase() + " to add more event.");
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
  public static generate(body: WeekEventsBodyArray, limitEachDay: number[]): WeekEvents {
    const weekEvent: WeekEventsArray = body.map(cur => {
      const result: DayEventBody = {
        name: cur.name,
        details
      }
    })
  }
}