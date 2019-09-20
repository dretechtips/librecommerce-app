import {  Day, ISingleEvent, SingleEventBody, eventID, IDayEvents, IWeekEvents } from "../interface/Events.interface";
import { Week } from "../type/Week";
import { TimeRange } from "./Range";
import uuid = require("uuid/v4");

export class SingleEvent implements ISingleEvent {
  private _name: string;
  private _hours: TimeRange;
  private _id: eventID;
  constructor(name: string, day: Day, hours: TimeRange) {
    this._name = name;
    this._hours = hours;
    this._id = uuid();
  }
  public getStart(): string {
    return this._hours.getStartTime();
  }
  public getEnd(): string {
    return this._hours.getEndTime();
  }
  public getName(): string {
    return this._name;
  }
  public getID(): eventID {
    return this._id;
  }
  public getTotalHours(): number {
    return this._hours.getTotalHours();
  }
  public static generate(body: SingleEventBody): SingleEvent {
    return new SingleEvent(body.name, body.day as Day, new TimeRange(body.startTime, body.endTime));
  }
}

export class DayEvents implements IDayEvents {
  private _events: Map<string, SingleEvent>;
  private _limit: number;
  constructor(events: SingleEvent[], limit: number) {
    this._events = new Map();
    for (let event of events) {
      this._events.set(event.getID(), event);
    }
    this._limit = limit;
  }
  public getEvent(id: string): SingleEvent {
    const event: SingleEvent = this._events.get(id);
    return event ? event : null;
  }
  public addEvent(event: SingleEvent): void {
    try {
      if (this.getLimit() == this.getSize() + 1)
        throw new Error("Cannot add this event because it will exceed the day limits.");
      this._events.set(event.getID(), event);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public getTotalHours(): number {
    let hour: number = 0;
    this._events.forEach(val => hour += val.getTotalHours());
    return hour;
  }
  public getLimit(): number {
    return this._limit;
  }
  public setLimit(limit: number): void {
    this._limit = limit;
  }
  public getSize(): number {
    return this._events.size;
  }
}

export class WeekEvents implements IWeekEvents
{
  private _days: {
    mon: DayEvents;
    tue: DayEvents;
    wed: DayEvents;
    thu: DayEvents;
    fri: DayEvents;
    sat: DayEvents;
    sun: DayEvents;
  }
  private _dayName: Day[] = Object.keys(this._days) as Day[];
  constructor(dayEvents: DayEvents[])
  {
    for (let i = 0; i < this._dayName.length; i++) {
      const name: Day = this._dayName[i];
      this._days[name] = dayEvents[i];
    }
  }
  public getTotalHours(): number {
    let hours: number = 0;
    for (let i = 0; i < this._dayName.length; i++) {
      const cur: Day = this._dayName[i];
      const dayEvent: DayEvents = this._days[cur];
      hours += dayEvent.getTotalHours();
    }
    return hours;
  }
  public addEvent(event: SingleEvent, day: Day): void {
    try {
      if (this._days[day].getLimit() === this._days[day].getSize() && this._days[day].getLimit() !== -1)
        throw new Error("The event limit has been reached on the day " + day.toUpperCase() + ".");
      this._days[day].addEvent(event);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public addEvents(event: SingleEvent[], day: Day): void {
    for (let i = 0; i < event.length; i++) {
      this._days[day].addEvent(event[i]);
    }
  }
  public getEvent(eventID: string, day: Day): SingleEvent {
    if (day !== undefined) {
      const event: SingleEvent = this._days[day].getEvent(eventID);
      if (event !== undefined)
        return event;
      else
        return null;
    }
  }
  public getEventsByDay(day: Day): DayEvents {
    return this._days[day];
  }
  public deleteEvent(eventID: string, day: Day): void {
    try {
      if (day !== undefined) {
        const isDeleted: boolean = this.getDayEvents(day).);
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
  public deleteEvents(eventID: string[], day: Day): void {
    for (let i = 0; i < eventID.length; i++) {
      this.deleteEvent(eventID[i]);
    }
  }
  public getLimit(day: Day): number {
    return this._days[day].getLimit();
  }
  public getLimitAll(): number[] {
    const limits: number[] = new Array<number>(7);
    for (let i = 0; i < this._dayName.length; i++) {
      const cur: Day = this._dayName[i];
      const limit = this.getLimit(cur);
      limits.push(limit);
    }
    return limits;
  }
  public setLimit(limit: number, day: Day): void {
    try {
      if (this.getDayEvents(day).getLimit() >= limit)
        throw new Error("The week event has been exceeded. Please delete some events on " + day.toUpperCase() + " to add more event.");
      this.getDayEvents(day).setLimit(limit);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public setLimitAll(limit: number): void {
    for (let i = 0; i < this._dayName.length; i++) {
      const cur: Day = this._dayName[i];
      this._days[cur].setLimit(limit);
    }
  }
  private getDayEvents(day: Day): DayEvents {
    return this._days[day];
  }
}