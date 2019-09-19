import { ScheduleConstructor, ScheduleBody } from "../interface/Schedule.inteface";
import { WeekEvents } from "../type/WeekEvents";
import { TimeRange } from "../type/Range";
import uuid = require("uuid/v4");
import { Day } from "../interface/Week.interface";

export class Schedule
{
  private _value: ScheduleConstructor;
  private _limits: number[] = [1, 1, 1, 1, 1, 1, 1]; 
  constructor(schedule: ScheduleConstructor)
  {
    try {
      if (schedule.events.getLimitAll() !== this._limits)
        throw new Error("System cannot create a schedule with an exceedling limit.");
      this._value = schedule;
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public save(): void {
    
  }
  public delete(): void {
    
  }
  public update(body: any): void {
    if(body.scheduleID) this._value.scheduleID = body.scheduleID;
    if(body.userID) this._value.userID = body.userID;
    if(body.events) this._value.events = new WeekEvents(body.events, [1, 1, 1, 1, 1, 1, 1]);
  }
  public addEvent(name: string, day: Day, hours: TimeRange) {
    try {
      const totalHour: number = this._value.events.getTotalHour();
      if (!this._value.hasOverTime && (40 < totalHour + hours.getTotalHour()))
        throw new Error("This employee schedule doesn't allow over time.");
      this._value.events.addEvent(name, day, hours);
    }
    catch (e) {
      const ex: Error = e;
      hconsole.error(ex);
    }
  }
  public deleteEvent(eventID: string, day?: Day): void {
    this._value.events.deleteEvent(eventID, day);
  }
  public static generate(body: ScheduleBody): Schedule {
    const scheduleConstruct: ScheduleConstructor = {
      userID: body.userID,
      scheduleID: uuid(),
      events: new WeekEvents(body.events, [1, 1, 1, 1, 1, 1, 1]),
      hasOverTime: body.hasOverTime
    }
    return new Schedule(scheduleConstruct);
  }
  
  public static From = class {
    public static id(scheduleID: string): Schedule {
      
    }
  }
}